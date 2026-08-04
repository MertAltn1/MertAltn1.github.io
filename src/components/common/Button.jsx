import { Link } from 'react-router-dom'

/**
 * One button, three shapes: router link (`to`), anchor (`href`), or plain
 * button (`onClick`). Pass a lucide component as `icon` to append a glyph.
 */
export default function Button({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  icon: Icon,
  external = false,
  ...rest
}) {
  const className = `button button--${variant}`
  const content = (
    <>
      {children}
      {Icon && <Icon size={16} aria-hidden="true" />}
    </>
  )

  if (to) {
    return <Link className={className} to={to} {...rest}>{content}</Link>
  }

  if (href) {
    const target = external ? { target: '_blank', rel: 'noreferrer' } : {}
    return <a className={className} href={href} {...target} {...rest}>{content}</a>
  }

  return <button className={className} type="button" onClick={onClick} {...rest}>{content}</button>
}
