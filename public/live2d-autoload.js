// Live2D Cubism 5 (v3) async autoload with multi-CDN fallback + moc3 blob precache
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

// ===== Moc3 blob precache =====
// Pre-downloads the moc3 and creates a blob URL. The fetch interceptor
// redirects the SDK's moc3 request to this blob URL (real Response, ~0ms).
let _moc3BlobUrl = null
const _origFetch = window.fetch

async function precacheMoc3(url) {
  try {
    const resp = await _origFetch(url)
    const buf = await resp.arrayBuffer()
    const blob = new Blob([buf], { type: 'application/octet-stream' })
    _moc3BlobUrl = URL.createObjectURL(blob)
    return buf
  } catch (e) {
    return null
  }
}

// Minimal fetch interceptor: only redirects the moc3 request to blob URL
window.fetch = function(url, opts) {
  const urlStr = (url instanceof Request) ? url.url : String(url)
  if (_moc3BlobUrl && urlStr.includes('重音テト.moc3')) {
    return _origFetch.call(window, _moc3BlobUrl, opts)
  }
  return _origFetch.call(window, url, opts)
}

async function loadWidgetBundleFromBase(base) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`

  // Start precaching the moc3 (runs in background while CSS/Core/SDK load)
  const moc3Url = localCdnPath + 'model/teto/重音テト.moc3'
  const moc3Promise = precacheMoc3(moc3Url)

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
