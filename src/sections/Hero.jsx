import { ArrowDown, ArrowUpRight, Download, GraduationCap, MapPin } from 'lucide-react'
import Avatar from '../components/common/Avatar'
import { Github } from '../components/common/BrandIcons'
import Button from '../components/common/Button'
import { site } from '../data/site'
import { education } from '../data/education'
import { quote } from '../data/quote'
import { useSectionNav } from '../hooks/useSectionNav'

export default function Hero() {
  const goToSection = useSectionNav()

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__name">{site.fullName}</h1>

          <p className="hero__role">{site.role} · {site.subtitle}</p>

          <p className="hero__lead">
            Third-year Computer Technology and Information Systems student at Bilkent University.
            I build software across test automation, frontend engineering, and Linux systems —
            most recently at Baykar and Turkcell.
          </p>

          <div className="hero__actions">
            <Button onClick={() => goToSection('projects')} icon={ArrowDown}>View my work</Button>
            {site.cv && (
              <Button href={site.cv} variant="secondary" external icon={Download}>Download CV</Button>
            )}
            <Button href={`mailto:${site.email}`} variant="text" icon={ArrowUpRight}>Get in touch</Button>
          </div>

          <div className="hero__meta">
            <span><MapPin size={15} aria-hidden="true" />{site.location}</span>
            <span><GraduationCap size={15} aria-hidden="true" />GPA {education.gpa} / 4.00</span>
            <a href={site.github} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" />{site.githubHandle}
            </a>
          </div>
        </div>

        <div className="hero__portrait">
          <Avatar
            src={site.photo}
            alt={`Portrait of ${site.fullName}`}
            caption={site.location}
          />
          <blockquote className="hero__quote">{quote.en}</blockquote>
        </div>
      </div>
    </section>
  )
}
