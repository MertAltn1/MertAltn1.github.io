import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Github, Linkedin } from '../common/BrandIcons'
import { sections } from '../../data/sections'
import { site } from '../../data/site'
import { useSectionNav } from '../../hooks/useSectionNav'
import { useLanguage } from '../../hooks/useLanguage'

export default function Footer() {
  const goToSection = useSectionNav()
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2><Link to="/">{site.fullName}</Link></h2>
          <p>{t.footer.text}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {sections.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => goToSection(id)}>{t.nav[id] ?? label}</button>
          ))}
        </nav>

        <div className="footer-social">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          )}
          <a href={`mailto:${site.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom mono">
        <span>© {new Date().getFullYear()} {site.fullName}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  )
}
