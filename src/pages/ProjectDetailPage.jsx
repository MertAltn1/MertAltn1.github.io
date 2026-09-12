import { ArrowLeft, PlayCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import { Github } from '../components/common/BrandIcons'
import CompanyLogo from '../components/common/CompanyLogo'
import { projects } from '../data/projects'
import { useSectionNav } from '../hooks/useSectionNav'
import NotFoundPage from './NotFoundPage'
import { copy } from '../data/copy'

// Work carried out inside client or employer systems — these case studies stay
// deliberately high level.
const CONFIDENTIAL_SLUGS = ['playwright-automation']

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const goToSection = useSectionNav()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFoundPage />

  return (
    <article className="detail container">
      <button className="back-link" type="button" onClick={() => goToSection('projects')}>
        <ArrowLeft size={16} aria-hidden="true" />{copy.projects.all}
      </button>

      <header className="detail__header">
        <span className="eyebrow">{project.category}</span>
        <h1>{project.title}</h1>
        {project.fullName && <p className="detail__meta mono">{project.fullName}</p>}
        <p className="detail__lead">{project.summary}</p>
      </header>

      <div className="detail__grid">
        <section className="detail__body">
          <h2 className="subheading">{copy.projects.challenge}</h2>
          <p className="detail__prose">{project.challenge}</p>

          <h2 className="subheading">{copy.projects.outcomes}</h2>
          <ul className="detail__list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          {project.shots && (
            <>
              <h2 className="subheading">{copy.projects.screens}</h2>
              <ul className="shot-list">
                {project.shots.map((shot) => (
                  <li key={shot.src}>
                    <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" />
                    <p>{shot.caption}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <aside className="detail__aside">
          {project.demo && (
            <div className="detail__demo">
              <Button href={project.demo} external icon={PlayCircle}>
                {copy.projects.demo}
              </Button>
              <p className="detail__note">{copy.projects.demoNote}</p>
            </div>
          )}

          <h2 className="subheading">{copy.projects.technology}</h2>
          {project.platform && (
            <CompanyLogo
              name={project.platform.name}
              src={project.platform.logo}
              className="company-logo--lg detail__platform"
            />
          )}
          <div className="tag-row">
            {project.technologies.map((tech) => (
              <span className="tag" key={tech}>{tech}</span>
            ))}
          </div>
          {project.repo && (
            <a className="text-link detail__repo" href={project.repo} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" />{copy.projects.source}
            </a>
          )}
          {CONFIDENTIAL_SLUGS.includes(project.slug) && (
            <p className="detail__note">
              {copy.projects.confidential}
            </p>
          )}
        </aside>
      </div>
    </article>
  )
}
