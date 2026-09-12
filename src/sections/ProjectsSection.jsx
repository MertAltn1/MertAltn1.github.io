import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import SectionHeading from '../components/common/SectionHeading'
import { Github } from '../components/common/BrandIcons'
import { projects } from '../data/projects'
import { copy } from '../data/copy'

export default function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          text={copy.projects.text}
        />

        <div className="project-grid">
          {projects.map((project, index) => (
            /*
             * The card is an <article>, not an <a>: cards with a demo or repo
             * carry their own links, and an anchor cannot be nested inside an
             * anchor. The title link is "stretched" over the whole card in CSS
             * instead, so the card still behaves as one big click target while
             * the action links stay individually clickable.
             */
            <article
              className={`card project-card${project.cover ? ' project-card--featured' : ''}`}
              key={project.slug}
            >
              {project.cover && (
                <img
                  className="project-card__cover"
                  src={project.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              )}

              <div className="project-card__top mono">
                <span>{project.category}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>

              <h3>
                <Link className="project-card__link" to={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>
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

              {(project.demo || project.repo) && (
                <div className="project-card__actions">
                  {project.demo && (
                    <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">
                      <PlayCircle size={15} aria-hidden="true" />{copy.projects.demo}
                    </a>
                  )}
                  {project.repo && (
                    <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
                      <Github size={14} aria-hidden="true" />GitHub
                    </a>
                  )}
                </div>
              )}

              <ArrowUpRight className="card-arrow" size={18} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
