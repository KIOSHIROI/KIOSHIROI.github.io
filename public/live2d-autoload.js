// Live2D Cubism 5 (v3) async autoload with multi-CDN fallback + moc3 precache
const widgetBaseCandidates = [
  window.__LIVE2D_WIDGET_BASE__,
  'https://cdn.jsdelivr.net/gh/letere-gzj/live2d-widget-v3@main/',
  'https://fastly.jsdelivr.net/gh/letere-gzj/live2d-widget-v3@main/'
].filter(Boolean)

const localCdnPath = (() => {
  const fromWindow = window.__LIVE2D_CDN_PATH__
  if (typeof fromWindow === 'string' && fromWindow.length > 0) {
    return fromWindow.endsWith('/') ? fromWindow : `${fromWindow}/`
  }

  const script = document.currentScript
  if (script && typeof script.src === 'string' && script.src.length > 0) {
    const scriptUrl = new URL(script.src, window.location.href)
    const base = scriptUrl.pathname.replace(/live2d-autoload\.js(?:\?.*)?$/, '')
    const normalizedBase = base.endsWith('/') ? base : `${base}/`
    return `${normalizedBase}live2d-api/`
  }

  return '/live2d-api/'
})()

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
      tag.async = true
      tag.defer = true
    }

    if (!tag) return reject(new Error(`Unsupported resource type: ${type}`))
    tag.onload = () => resolve(url)
    tag.onerror = () => reject(new Error(`Failed to load: ${url}`))
    document.head.appendChild(tag)
  })
}

// ===== Moc3 precache system =====
// Stores pre-fetched ArrayBuffers and intercepts fetch() to return them instantly.
const _precacheStore = new Map()
const _origFetch = window.fetch

async function precacheFile(url) {
  try {
    const resp = await _origFetch(url)
    const ct = resp.headers.get('content-type') || 'application/octet-stream'
    const buf = await resp.arrayBuffer()
    _precacheStore.set(url, { buffer: buf, contentType: ct })
    return buf
  } catch (e) {
    // Silently fail — the normal network fetch will handle it
    return null
  }
}

// Install fetch interceptor (must happen before SDK loads)
window.fetch = function(url, opts) {
  const urlStr = (url instanceof Request) ? url.url : String(url)
  const hit = _precacheStore.get(urlStr)
  if (hit) {
    return Promise.resolve(new Response(hit.buffer, {
      status: 200,
      headers: {
        'Content-Type': hit.contentType,
        'Content-Length': String(hit.buffer.byteLength)
      }
    }))
  }
  return _origFetch.call(window, url, opts)
}

async function loadWidgetBundleFromBase(base) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`

  // Start precaching the moc3 immediately (runs in background)
  const moc3Url = localCdnPath + 'model/teto/重音テト.moc3'
  const moc3Promise = precacheFile(moc3Url)

  await loadExternalResource(`${normalizedBase}waifu.css`, 'css')
  await loadExternalResource(`${normalizedBase}Core/live2dcubismcore.js`, 'js')
  await loadExternalResource(`${normalizedBase}live2d-sdk.js`, 'js')
  await loadExternalResource(`${normalizedBase}waifu-tips.js`, 'js')

  // Wait for moc3 precache to finish
  await moc3Promise

  if (typeof window.initWidget !== 'function') {
    throw new Error(`initWidget is not available from ${normalizedBase}`)
  }

  return normalizedBase
}

async function loadWidgetBundleWithFallback() {
  let lastError
  for (const base of widgetBaseCandidates) {
    try {
      return await loadWidgetBundleFromBase(base)
    } catch (error) {
      lastError = error
    }
  }
  throw lastError || new Error('Failed to load live2d widget bundle')
}

const minWidth = Number(window.__LIVE2D_MIN_WIDTH__ || 768)
const LIVE2D_ACTIVE_KEY = '__live2d_widget_active__'

function cleanupLive2DWidget() {
  const waifuEl = document.getElementById('waifu')
  const toggleEl = document.getElementById('waifu-toggle')
  const live2dCanvas = document.getElementById('live2d')

  if (live2dCanvas instanceof HTMLCanvasElement) {
    const gl = live2dCanvas.getContext('webgl') || live2dCanvas.getContext('experimental-webgl')
    if (gl) {
      const ext = gl.getExtension('WEBGL_lose_context')
      if (ext) ext.loseContext()
    }
  }

  if (waifuEl) waifuEl.remove()
  if (toggleEl) toggleEl.remove()
  window[LIVE2D_ACTIVE_KEY] = false
}

if (window.innerWidth >= minWidth && !window[LIVE2D_ACTIVE_KEY]) {
  window[LIVE2D_ACTIVE_KEY] = true
  ;(async () => {
    try {
      const activeBase = await loadWidgetBundleWithFallback()

      // force default model to teto
      localStorage.setItem('modelId', '0')
      localStorage.setItem('modelTexturesId', '0')

      initWidget({
        waifuPath: `${activeBase}waifu-tips.json`,
        cdnPath: localCdnPath,
        homePath: 'https://kioshiroi.github.io/',
        tools: ['hitokoto', 'express', 'photo', 'info', 'quit'],
        dragEnable: true,
        dragDirection: ['x', 'y'],
        switchType: 'order'
      })

      window.addEventListener('pagehide', cleanupLive2DWidget, { once: true })
      window.addEventListener('beforeunload', cleanupLive2DWidget, { once: true })
    } catch (error) {
      window[LIVE2D_ACTIVE_KEY] = false
      console.error('[live2d] widget failed to load', error)
    }
  })()
}
