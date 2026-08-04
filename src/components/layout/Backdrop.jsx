/**
 * Purely decorative aurora + film grain behind the top of the page.
 * All motion lives in CSS (src/styles/backdrop.css) — no JS, no scroll
 * listeners, no canvas.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="backdrop__blob backdrop__blob--1" />
      <span className="backdrop__blob backdrop__blob--2" />
      <span className="backdrop__blob backdrop__blob--3" />
      <span className="backdrop__grain" />
    </div>
  )
}
