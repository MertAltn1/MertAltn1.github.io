import { useState } from 'react'

/**
 * Portrait with a graceful degradation path: if the image file is missing the
 * frame keeps its exact dimensions and shows a monogram, so the hero layout
 * never shifts.
 */
export default function Avatar({ src, alt, initials = 'MA', caption }) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <figure className="avatar">
      <div className="avatar__frame">
        {showImage ? (
          <img
            className="avatar__img"
            src={src}
            alt={alt}
            width="680"
            height="850"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="avatar__monogram">
            <span aria-hidden="true">{initials}</span>
            <span className="visually-hidden">{alt}</span>
          </div>
        )}
        {caption && <figcaption className="avatar__caption">{caption}</figcaption>}
      </div>
    </figure>
  )
}
