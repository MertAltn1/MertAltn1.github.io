import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Scrolls to a section on the home page.
 *
 * The app runs on HashRouter, so plain `href="#experience"` anchors would
 * overwrite the router's own hash and break routing. We scroll imperatively
 * instead. From a detail route we navigate home first, then scroll once the
 * home page has actually laid out.
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback((id) => {
    const scrollToSection = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (pathname === '/') {
      scrollToSection()
      return
    }

    navigate('/')
    // Two frames: one for React to commit the home page, one for layout to settle
    // (MainLayout's scroll-to-top effect has already run by then).
    requestAnimationFrame(() => requestAnimationFrame(scrollToSection))
  }, [navigate, pathname])
}
