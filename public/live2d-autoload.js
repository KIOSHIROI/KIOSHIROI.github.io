// Live2D async autoload with multi-CDN fallback
const widgetBaseCandidates = [
  window.__LIVE2D_WIDGET_BASE__,
  'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/',
  'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/'
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

async function loadWidgetBundleFromBase(base) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  await loadExternalResource(`${normalizedBase}waifu.css`, 'css')
  await loadExternalResource(`${normalizedBase}live2d.min.js`, 'js')
  await loadExternalResource(`${normalizedBase}waifu-tips.js`, 'js')

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

function triggerEntranceAnimation() {
  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) return

  const applyEntrance = () => {
    const waifuEl = document.getElementById('waifu')
    if (!waifuEl) return false
    if (waifuEl.dataset.live2dEntered === '1') return true

    waifuEl.dataset.live2dEntered = '1'
    waifuEl.style.willChange = 'transform, opacity'
    waifuEl.style.transition = 'none'
    waifuEl.style.opacity = '0'
    waifuEl.style.transform = 'translate3d(0, 72px, 0)'

    waifuEl.getBoundingClientRect()

    // Give Live2D a short settle window so the first pose transition
    // (e.g. hand near mouth -> idle) happens offscreen.
    const settleDelayMs = 680

    const startAnimation = () => {
      waifuEl.style.transition =
        'transform 760ms cubic-bezier(0.16, 0.84, 0.24, 1), opacity 560ms ease'
      waifuEl.style.opacity = '1'
      waifuEl.style.transform = 'translate3d(0, 0, 0)'

      const clearWillChange = () => {
        waifuEl.style.willChange = ''
      }

      waifuEl.addEventListener('transitionend', clearWillChange, { once: true })
      setTimeout(clearWillChange, 1200)
    }

    setTimeout(() => {
      requestAnimationFrame(startAnimation)
    }, settleDelayMs)

    return true
  }

  if (applyEntrance()) return

  const observer = new MutationObserver(() => {
    if (applyEntrance()) {
      observer.disconnect()
      clearTimeout(disconnectTimer)
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })

  const disconnectTimer = setTimeout(() => {
    observer.disconnect()
  }, 3000)

  window.addEventListener(
    'pagehide',
    () => {
      observer.disconnect()
      clearTimeout(disconnectTimer)
    },
    { once: true }
  )
}

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

      // force default model to index 0 (our local miku)
      localStorage.setItem('modelId', '0')
      localStorage.setItem('modelTexturesId', '0')

      initWidget({
        waifuPath: `${activeBase}waifu-tips.json`,
        cdnPath: localCdnPath,
        tools: ['hitokoto', 'photo', 'info', 'quit']
      })

      triggerEntranceAnimation()

      window.addEventListener('pagehide', cleanupLive2DWidget, { once: true })
      window.addEventListener('beforeunload', cleanupLive2DWidget, { once: true })
    } catch (error) {
      window[LIVE2D_ACTIVE_KEY] = false
      console.error('[live2d] widget failed to load', error)
    }
  })()
}
