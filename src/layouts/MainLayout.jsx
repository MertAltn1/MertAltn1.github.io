import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Backdrop from '../components/layout/Backdrop'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { site } from '../data/site'
import { useLanguage } from '../hooks/useLanguage'

export default function MainLayout() {
  const { pathname } = useLocation()
  const { language, t } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
    const segment = pathname.split('/').filter(Boolean)[0]
    document.title = segment
      ? `${segment[0].toUpperCase()}${segment.slice(1)} — ${site.fullName}`
      : `${site.fullName} — ${t.hero.role}`
  }, [pathname, language, t.hero.role])

  // A real `href="#main"` would overwrite HashRouter's hash and blow away the
  // current route, so the skip link moves focus itself.
  const skipToMain = () => {
    const main = document.getElementById('main')
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <>
      <button className="skip-link" type="button" onClick={skipToMain}>{t.a11y.skip}</button>
      <Backdrop />
      <Header />
      <main className="site-main" id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
