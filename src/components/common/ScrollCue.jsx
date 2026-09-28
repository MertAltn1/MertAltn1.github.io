import { useEffect, useState } from 'react'

/**
 * "Scroll to explore" cue at the foot of the hero.
 *
 * Visibility is one boolean driven by two conditions, and it is expressed as a
 * CSS transition rather than an animation on purpose: a keyframe animation with
 * `forwards` outranks plain declarations, so mixing the two meant the cue
 * either would not hide, or would not come back when the visitor scrolled up.
 */
export default function ScrollCue({ label, onActivate }) {
  const [ready, setReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Let the hero content land first; the cue is the last thing to arrive.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = ready && !scrolled

  return (
    <button
      className="scroll-cue"
      type="button"
      data-visible={visible}
      onClick={onActivate}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg className="scroll-cue__mouse" viewBox="0 0 24 38" aria-hidden="true">
        <rect x="1" y="1" width="22" height="36" rx="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle className="scroll-cue__wheel" cx="12" cy="10" r="2" fill="currentColor" />
      </svg>
      <span className="scroll-cue__label">{label}</span>
      <svg className="scroll-cue__chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
