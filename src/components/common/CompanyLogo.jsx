import { useState } from 'react'

/**
 * A brand mark, rendered into a fixed box.
 *
 * Every logo has a different aspect ratio, so matching them by height alone
 * leaves them wildly different widths. Instead each mark gets an identical box
 * and `object-fit: contain` scales it down to fit — so every logo on the page
 * occupies exactly the same footprint. Colour is flattened to a single
 * silhouette in CSS.
 *
 * Renders nothing when there is no file; every caller also spells out the name.
 */
export default function CompanyLogo({ name, src, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return null

  return (
    <img
      className={`company-logo ${className}`.trim()}
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
