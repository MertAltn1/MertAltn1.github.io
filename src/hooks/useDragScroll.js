import { useEffect, useRef } from 'react'

/**
 * Horizontal rail behaviour: grab-and-pan, arrow keys, and an optional
 * continuous drift.
 *
 * The drift moves `scrollLeft` rather than animating a transform, so native
 * scrolling, dragging and the scrollbar all keep working while it runs. The
 * caller renders its items twice and marks the first copy of the second set
 * with `data-loop-start`; the distance between that element and the first one
 * is the exact amount to wrap by, which `scrollWidth / 2` is not once gaps and
 * padding are involved.
 *
 * Motion stops whenever the visitor is likely to be reading: pointer over the
 * rail, keyboard focus inside it, an active drag, a hidden tab, or
 * prefers-reduced-motion. WCAG 2.2.2 requires moving content to be pausable,
 * and a strip nobody can stop reading is just noise.
 */
export function useDragScroll({ drift = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let dragging = false
    let startX = 0
    let startLeft = 0
    let moved = 0
    let paused = false
    let frame = 0

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    /* ---------- drag ---------- */
    const onPointerDown = (event) => {
      if (event.button !== 0) return
      dragging = true
      moved = 0
      startX = event.clientX
      startLeft = el.scrollLeft
      el.classList.add('is-dragging')
    }

    const onPointerMove = (event) => {
      if (!dragging) return
      const dx = event.clientX - startX
      moved = Math.max(moved, Math.abs(dx))
      if (moved > 4 && !el.hasPointerCapture(event.pointerId)) {
        el.setPointerCapture(event.pointerId)
      }
      el.scrollLeft = startLeft - dx
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
        el.scrollBy({ left: step, behavior: 'smooth' })
        event.preventDefault()
      }
      if (event.key === 'ArrowLeft') {
        el.scrollBy({ left: -step, behavior: 'smooth' })
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

    if (drift > 0) {
      el.addEventListener('pointerenter', pause)
      el.addEventListener('pointerleave', resume)
      el.addEventListener('focusin', pause)
      el.addEventListener('focusout', resume)

      const step = () => {
        frame = requestAnimationFrame(step)
        if (paused || dragging || document.hidden || reduced.matches) return

        // Distance between the first card and its clone. Measured as the gap
        // between the two, not the clone's raw offsetLeft: that includes the
        // rail's left padding, and subtracting it left a visible jump of
        // exactly one padding's width on every loop.
        const loop = el.querySelector('[data-loop-start]')
        const first = el.firstElementChild
        const wrapAt = loop && first ? loop.offsetLeft - first.offsetLeft : 0

        el.scrollLeft += drift
        if (wrapAt > 0 && el.scrollLeft >= wrapAt) el.scrollLeft -= wrapAt
      }

      frame = requestAnimationFrame(step)
    }

    return () => {
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
  }, [drift])

  return ref
}
