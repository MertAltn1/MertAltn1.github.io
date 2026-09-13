import { Link } from 'react-router-dom'

/**
 * One button, three shapes: router link (`to`), anchor (`href`), or plain
 * button. Pass a lucide component as `icon` to append a glyph.
 *
 * `onClick` is forwarded in all three shapes — it used to reach only the
 * <button> branch, so handlers on link-shaped buttons were dropped silently.
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
    return <Link className={className} to={to} onClick={onClick} {...rest}>{content}</Link>
  }

  if (href) {
    const target = external ? { target: '_blank', rel: 'noreferrer' } : {}
    return <a className={className} href={href} onClick={onClick} {...target} {...rest}>{content}</a>
  }

  return <button className={className} type="button" onClick={onClick} {...rest}>{content}</button>
}
