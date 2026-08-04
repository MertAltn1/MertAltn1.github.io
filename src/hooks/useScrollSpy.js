import { useEffect, useState } from 'react'

/**
 * Reports which of the given section ids is currently in the reading band.
 *
 * The rootMargin squeezes the viewport down to a horizontal strip around the
 * middle of the screen, so exactly one section reads as active at a time
 * instead of every partially-visible one.
 */
export function useScrollSpy(ids, enabled = true) {
  const [activeId, setActiveId] = useState(null)

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
        setActiveId(ids.find((id) => visibility.get(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids, enabled])

  return activeId
}
