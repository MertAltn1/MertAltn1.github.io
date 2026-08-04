import { ArrowLeft } from 'lucide-react'
import { useParams } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import { experiences } from '../data/experiences'
import { useSectionNav } from '../hooks/useSectionNav'
import NotFoundPage from './NotFoundPage'

export default function ExperienceDetailPage() {
  const { slug } = useParams()
  const goToSection = useSectionNav()
  const item = experiences.find((experience) => experience.slug === slug)

  if (!item) return <NotFoundPage />

  return (
    <article className="detail container">
      <button className="back-link" type="button" onClick={() => goToSection('experience')}>
        <ArrowLeft size={16} aria-hidden="true" />All experience
      </button>

      <header className="detail__header">
        <span className="eyebrow">{item.company} · {item.period}</span>
        <CompanyLogo name={item.company} src={item.logo} className="company-logo--lg" />
        <h1>{item.role}</h1>
        <p className="detail__lead">{item.summary}</p>
        <p className="detail__meta mono">
          {item.type}{item.location ? ` · ${item.location}` : ''}
        </p>
      </header>

      <div className="detail__grid">
        <section className="detail__body">
          <h2 className="subheading">Contribution</h2>
          <ul className="detail__list">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <aside className="detail__aside">
          <h2 className="subheading">Tools &amp; context</h2>
          <div className="tag-row">
            {item.technologies.map((tech) => (
              <span className="tag" key={tech}>{tech}</span>
            ))}
          </div>
          <p className="detail__note">
            {item.note ??
              'Presented at a professional overview level; internal and confidential details are intentionally excluded.'}
          </p>
        </aside>
      </div>
    </article>
  )
}
