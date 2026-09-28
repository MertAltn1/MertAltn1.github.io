import { useEffect, useRef } from 'react'

/**
 * Makes a horizontally scrollable element draggable with a pointer, and
 * navigable with the arrow keys.
 *
 * Native scrolling still does the work — this only adds grab-and-pan on top of
 * it, so touch, trackpad, scrollbar and keyboard all keep behaving normally.
 * Vertical page scrolling is never hijacked.
 */
export function useDragScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let dragging = false
    let startX = 0
    let startLeft = 0
    let moved = 0

    const onPointerDown = (event) => {
      // Let the browser handle text selection and real interactive children.
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
      // Only capture once it is clearly a drag, so a plain click still works.
      if (moved > 4 && el.hasPointerCapture?.(event.pointerId) === false) {
        el.setPointerCapture(event.pointerId)
      }
      el.scrollLeft = startLeft - dx
    }

    const onPointerUp = () => {
      if (!dragging) return
      dragging = false
      el.classList.remove('is-dragging')
    }

    // A drag that ends on a link should not also open it.
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
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    el.addEventListener('click', onClickCapture, true)
    el.addEventListener('keydown', onKeyDown)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('click', onClickCapture, true)
      el.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return ref
}
