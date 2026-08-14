import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../common/ThemeToggle'
import LanguageToggle from '../common/LanguageToggle'
import { navSectionIds, navSections } from '../../data/sections'
import { useSectionNav } from '../../hooks/useSectionNav'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { site } from '../../data/site'
import { useLanguage } from '../../hooks/useLanguage'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const goToSection = useSectionNav()
  const isHome = pathname === '/'
  const activeId = useScrollSpy(navSectionIds, isHome)
  const { t } = useLanguage()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    goToSection(id)
  }

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container nav-shell">
        <Link className="wordmark" to="/" aria-label={`${site.fullName} — ${t.a11y.home}`}>
          <span className="wordmark__mark" aria-hidden="true">MA</span>
          {site.name}
        </Link>

        <nav className="nav-links" data-open={open} aria-label={t.a11y.sections}>
          {navSections.map(({ id, label }) => (
            <button
              key={id}
              className="nav-link"
              type="button"
              aria-current={isHome && activeId === id}
              onClick={() => handleNav(id)}
            >
              {t.nav[id] ?? label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={t.a11y.toggleNav}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
