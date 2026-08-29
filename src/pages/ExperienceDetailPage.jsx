import { ArrowLeft } from 'lucide-react'
import { useParams } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import { experiences } from '../data/experiences'
import { useSectionNav } from '../hooks/useSectionNav'
import NotFoundPage from './NotFoundPage'
import { copy } from '../data/copy'

export default function ExperienceDetailPage() {
  const { slug } = useParams()
  const goToSection = useSectionNav()
  const item = experiences.find((experience) => experience.slug === slug)

  if (!item) return <NotFoundPage />

  return (
    <article className="detail container">
      <button className="back-link" type="button" onClick={() => goToSection('experience')}>
        <ArrowLeft size={16} aria-hidden="true" />{copy.experience.all}
      </button>

      <header className="detail__header">
        <span className="eyebrow">{item.company} · {item.period}</span>
        <CompanyLogo
          name={item.company}
          src={item.logo}
          className={`company-logo--lg ${item.logoClassName ?? ''}`}
        />
        <h1>{item.role}</h1>
        <p className="detail__lead">{item.summary}</p>
        <p className="detail__meta mono">
          {item.type}{item.location ? ` · ${item.location}` : ''}
        </p>
      </header>

      <div className="detail__grid">
        <section className="detail__body">
          <h2 className="subheading">{copy.experience.contribution}</h2>
          <ul className="detail__list">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <aside className="detail__aside">
          <h2 className="subheading">{copy.experience.tools}</h2>
          <div className="tag-row">
            {item.technologies.map((tech) => (
              <span className="tag" key={tech}>{tech}</span>
            ))}
          </div>
          <p className="detail__note">
            {item.note ??
              copy.experience.fallbackNote}
          </p>
        </aside>
      </div>
    </article>
  )
}
