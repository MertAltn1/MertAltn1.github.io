import { ArrowLeft, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import { experiences } from '../data/experiences'
import { projects } from '../data/projects'
import { useSectionNav } from '../hooks/useSectionNav'
import NotFoundPage from './NotFoundPage'
import { copy } from '../data/copy'

export default function ExperienceDetailPage() {
  const { slug } = useParams()
  const goToSection = useSectionNav()
  const item = experiences.find((experience) => experience.slug === slug)

  // Projects this placement produced, resolved from the slugs in experiences.js
  const related = (item?.projects ?? [])
    .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
    .filter(Boolean)

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

          {related.length > 0 && (
            <>
              <h2 className="subheading">{copy.experience.built}</h2>
              <div className="related-grid">
                {related.map((project) => (
                  <article className="card related-card" key={project.slug}>
                    <h3>
                      <Link className="project-card__link" to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p>{project.summary}</p>
                    {project.demo && (
                      <a
                        className="text-link related-card__demo"
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <PlayCircle size={15} aria-hidden="true" />{copy.projects.demo}
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
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
