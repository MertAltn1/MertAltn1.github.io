import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics'

/**
 * Reports which of the given section ids is currently in the reading band.
 *
 * The rootMargin squeezes the viewport down to a horizontal strip around the
 * middle of the screen, so exactly one section reads as active at a time
 * instead of every partially-visible one.
 */
export function useScrollSpy(ids, enabled = true) {
  const [activeId, setActiveId] = useState(null)
  // Sections already reported this page load — each one counts once, otherwise
  // scrolling up and down would fire the same event over and over.
  const reported = useRef(new Set())

  useEffect(() => {
    if (!enabled) {
      setActiveId(null)
      return
    }

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return

    const visibility = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.isIntersecting)
        // Document order wins when two sections straddle the band.
        const next = ids.find((id) => visibility.get(id)) ?? null
        setActiveId(next)

        // Doubles as reading-depth tracking: which sections a visitor got to.
        if (next && !reported.current.has(next)) {
          reported.current.add(next)
          track('section_view', { section: next })
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids, enabled])

  return activeId
}
