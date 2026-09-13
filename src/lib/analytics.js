import { analytics } from '../data/analytics'

/**
 * Thin wrapper over a cookieless analytics provider.
 *
 * Every function here is a no-op until `analytics.siteId` is set, so the rest
 * of the app can call `track(...)` freely without guarding each call site.
 */

let loading = null

function isDisabled() {
  if (!analytics.siteId) return true
  if (typeof window === 'undefined') return true
  if (analytics.ignoreLocalhost && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) {
    return true
  }
  return false
}

function loadScript(src, attrs = {}) {
  if (loading) return loading

  loading = new Promise((resolve) => {
    const el = document.createElement('script')
    el.src = src
    el.async = true
    el.dataset.noIntercept = 'true'
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
    el.onload = () => resolve(true)
    el.onerror = () => resolve(false)   // an ad blocker is not an error worth surfacing
    document.head.appendChild(el)
  })

  return loading
}

/** Loads the provider script. Safe to call more than once. */
export function initAnalytics() {
  if (isDisabled()) return

  if (analytics.provider === 'goatcounter') {
    // no-onload: we send the first pageview ourselves, so route changes and the
    // initial load go through exactly the same path.
    window.goatcounter = { no_onload: true }
    loadScript('https://gc.zgo.at/count.js', {
      'data-goatcounter': `https://${analytics.siteId}.goatcounter.com/count`,
    })
    return
  }

  if (analytics.provider === 'umami') {
    loadScript(`${analytics.host}/script.js`, {
      'data-website-id': analytics.siteId,
      'data-auto-track': 'false',
    })
  }
}

/**
 * Records a pageview.
 *
 * The site runs on HashRouter, so the browser URL barely changes between
 * routes; the path is passed explicitly instead of letting the provider guess.
 */
export function trackPageview(path) {
  if (isDisabled()) return

  if (analytics.provider === 'goatcounter') {
    loading?.then(() => {
      window.goatcounter?.count?.({ path, title: document.title, event: false })
    })
    return
  }

  if (analytics.provider === 'umami') {
    loading?.then(() => window.umami?.track?.((props) => ({ ...props, url: path })))
  }
}

/** Records a named event, e.g. track('demo_click', { project: 'artsconnect' }). */
export function track(name, data = {}) {
  if (isDisabled()) return

  if (analytics.provider === 'goatcounter') {
    // GoatCounter has no event properties, so they are folded into the path.
    const suffix = Object.values(data).filter(Boolean).join('-')
    loading?.then(() => {
      window.goatcounter?.count?.({
        path: suffix ? `${name}-${suffix}` : name,
        title: name,
        event: true,
      })
    })
    return
  }

  if (analytics.provider === 'umami') {
    loading?.then(() => window.umami?.track?.(name, data))
  }
}
