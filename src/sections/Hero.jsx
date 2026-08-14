import { ArrowDown, ArrowUpRight, Download, GraduationCap, MapPin } from 'lucide-react'
import Avatar from '../components/common/Avatar'
import { Github, Linkedin } from '../components/common/BrandIcons'
import Button from '../components/common/Button'
import { site } from '../data/site'
import { education } from '../data/education'
import { quote } from '../data/quote'
import { fill } from '../data/translations'
import { useSectionNav } from '../hooks/useSectionNav'
import { useLanguage } from '../hooks/useLanguage'

export default function Hero() {
  const goToSection = useSectionNav()
  const { language, t } = useLanguage()

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__name">{site.fullName}</h1>

          <p className="hero__role">{t.hero.role} · {t.hero.subtitle}</p>

          <p className="hero__lead">
            {t.hero.lead}
          </p>

          <div className="hero__actions">
            <Button onClick={() => goToSection('projects')} icon={ArrowDown}>{t.hero.work}</Button>
            {site.cv && (
              <Button href={site.cv} variant="secondary" external icon={Download}>{t.hero.cv}</Button>
            )}
            <Button href={`mailto:${site.email}`} variant="text" icon={ArrowUpRight}>{t.hero.contact}</Button>
          </div>

          <div className="hero__meta">
            <span><MapPin size={15} aria-hidden="true" />{site.location}</span>
            <span><GraduationCap size={15} aria-hidden="true" />{t.hero.gpa} {education.gpa} / 4.00</span>
            <a href={site.github} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" />{site.githubHandle}
            </a>
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={15} aria-hidden="true" />{site.name}
              </a>
            )}
          </div>
        </div>

        <div className="hero__portrait">
          <Avatar
            src={site.photo}
            alt={fill(t.hero.portraitAlt, { name: site.fullName })}
            caption={site.location}
          />
          <blockquote className="hero__quote">{quote[language]}</blockquote>
        </div>
      </div>
    </section>
  )
}
