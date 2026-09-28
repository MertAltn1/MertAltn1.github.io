import { useEffect, useRef } from 'react'

/**
 * Horizontal rail behaviour: grab-and-pan, arrow keys, and an optional endless
 * loop that also drifts on its own.
 *
 * The caller renders its items twice and marks the first copy of the second
 * set with `data-loop-start`. The distance between that element and the first
 * one is how far the rail travels before it can jump back — measured as the
 * gap between the two, since `offsetLeft` alone includes the rail's padding
 * and `scrollWidth / 2` ignores the gaps.
 *
 * Wrapping happens on every scroll, not just while drifting: dragging past the
 * end would otherwise run into the duplicate copies and show every card twice.
 *
 * Motion stops whenever someone is likely to be reading — pointer over the
 * rail, keyboard focus inside it, an active drag, a hidden tab, or
 * prefers-reduced-motion. WCAG 2.2.2 asks that moving content be pausable.
 */
export function useDragScroll({ drift = 0, loop = false } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let dragging = false
    let lastX = 0
    let moved = 0
    let paused = false
    let frame = 0
    let lastLeft = 0
    let wrapping = false

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const wrapDistance = () => {
      const clone = el.querySelector('[data-loop-start]')
      const first = el.firstElementChild
      return clone && first ? clone.offsetLeft - first.offsetLeft : 0
    }

    /** Keeps the rail inside the first copy of the list, in both directions. */
    const normalize = () => {
      if (!loop || wrapping) return
      const wrapAt = wrapDistance()
      if (wrapAt <= 0) return

      if (el.scrollLeft >= wrapAt) {
        wrapping = true
        el.scrollLeft -= wrapAt
        wrapping = false
      } else if (el.scrollLeft <= 0 && lastLeft > 1) {
        // Scrolling back past the start continues into the copy behind it.
        wrapping = true
        el.scrollLeft += wrapAt
        wrapping = false
      }
      lastLeft = el.scrollLeft
    }

    // Also on scroll, so the loop still closes when there is no drift running.
    el.addEventListener('scroll', normalize, { passive: true })

    /* ---------- drag ---------- */
    const onPointerDown = (event) => {
      if (event.button !== 0) return
      dragging = true
      moved = 0
      lastX = event.clientX
      el.classList.add('is-dragging')
    }

    const onPointerMove = (event) => {
      if (!dragging) return
      // Incremental, not anchored to a start position: a wrap mid-drag would
      // otherwise make the rail jump away from the pointer.
      const dx = event.clientX - lastX
      lastX = event.clientX
      moved += Math.abs(dx)
      if (moved > 4 && !el.hasPointerCapture(event.pointerId)) {
        el.setPointerCapture(event.pointerId)
      }
      el.scrollLeft -= dx
    }

    const endDrag = () => {
      if (!dragging) return
      dragging = false
      el.classList.remove('is-dragging')
    }

    // A drag that finishes on a link must not also open it.
    const onClickCapture = (event) => {
      if (moved > 6) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    const onKeyDown = (event) => {
      const card = el.firstElementChild
      if (!card) return
      const step = card.getBoundingClientRect().width + 24
      if (event.key === 'ArrowRight') {
        el.scrollBy({ left: step })
        event.preventDefault()
      }
      if (event.key === 'ArrowLeft') {
        el.scrollBy({ left: -step })
        event.preventDefault()
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointercancel', endDrag)
    el.addEventListener('click', onClickCapture, true)
    el.addEventListener('keydown', onKeyDown)

    /* ---------- drift ---------- */
    const pause = () => { paused = true }
    const resume = () => { paused = false }

    if (drift > 0 || loop) {
      el.addEventListener('pointerenter', pause)
      el.addEventListener('pointerleave', resume)
      el.addEventListener('focusin', pause)
      el.addEventListener('focusout', resume)

      const step = () => {
        frame = requestAnimationFrame(step)

        // Wrap every frame, whatever moved the rail — drift, drag, wheel or
        // keyboard. Leaving this to the scroll event alone meant a fast drag
        // could travel into the duplicate copies before it fired.
        normalize()

        if (drift <= 0) return
        if (paused || dragging || document.hidden || reduced.matches) return
        el.scrollLeft += drift
      }

      frame = requestAnimationFrame(step)
    }

    return () => {
      el.removeEventListener('scroll', normalize)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointercancel', endDrag)
      el.removeEventListener('click', onClickCapture, true)
      el.removeEventListener('keydown', onKeyDown)
      el.removeEventListener('pointerenter', pause)
      el.removeEventListener('pointerleave', resume)
      el.removeEventListener('focusin', pause)
      el.removeEventListener('focusout', resume)
      cancelAnimationFrame(frame)
    }
  }, [drift, loop])

  return ref
}
