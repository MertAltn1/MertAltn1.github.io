/**
 * Analytics configuration.
 *
 * Nothing is loaded and no request is made until `siteId` is filled in — the
 * whole layer is inert until then, so the site ships with zero third-party
 * requests by default.
 *
 * Both supported providers are cookieless, which is why there is no cookie
 * banner anywhere on this site. Do not swap in a cookie-based tool (Google
 * Analytics) without adding consent handling first.
 *
 * ── To switch it on ────────────────────────────────────────────────────────
 *  GoatCounter: create a site at goatcounter.com, then set
 *      provider: 'goatcounter'
 *      siteId:   'yourname'          ← the <yourname>.goatcounter.com subdomain
 *
 *  Umami: create a website in the Umami dashboard, then set
 *      provider: 'umami'
 *      siteId:   '<website id uuid>'
 *      host:     'https://cloud.umami.is'   (or your own instance)
 */
export const analytics = {
  provider: 'goatcounter',

  // The <siteId>.goatcounter.com subdomain. Empty string disables analytics.
  siteId: 'mertaltn1',

  // Only used by Umami.
  host: 'https://cloud.umami.is',

  // Localhost visits would otherwise pollute the numbers during development.
  ignoreLocalhost: true,
}
