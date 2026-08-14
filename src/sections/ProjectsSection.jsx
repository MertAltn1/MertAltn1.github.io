import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import SectionHeading from '../components/common/SectionHeading'
import { projects } from '../data/projects'
import { useLanguage } from '../hooks/useLanguage'

export default function ProjectsSection() {
  const { t, localize } = useLanguage()
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          text={t.projects.text}
        />

        <div className="project-grid">
          {projects.map((rawProject, index) => {
            const project = localize(rawProject)
            return (
            <Link className="card project-card" to={`/projects/${project.slug}`} key={project.slug}>
              <div className="project-card__top mono">
                <span>{project.category}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>

              <h3>{project.title}</h3>
              {project.fullName && <p className="project-card__alt">{project.fullName}</p>}
              <p className="project-card__summary">{project.summary}</p>

              {project.platform && (
                <CompanyLogo
                  name={project.platform.name}
                  src={project.platform.logo}
                  className="project-card__platform"
                />
              )}

              <div className="tag-row project-card__tags">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span className="tag" key={tech}>{tech}</span>
                ))}
              </div>

              <ArrowUpRight className="card-arrow" size={18} aria-hidden="true" />
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
