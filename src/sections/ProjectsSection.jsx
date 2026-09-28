import { PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import SectionHeading from '../components/common/SectionHeading'
import { Github } from '../components/common/BrandIcons'
import { projects } from '../data/projects'
import { copy } from '../data/copy'
import { track } from '../lib/analytics'

export default function ProjectsSection() {
  /*
   * Split by whether the project has a preview. Mixing both kinds in one grid
   * left a 300px hole beside every image card and a lone card on the last row;
   * grouped, each grid holds cards of similar height and the difference reads
   * as hierarchy instead of raggedness. Numbering stays continuous.
   */
  const withShot = projects.filter((project) => project.shot)
  const textOnly = projects.filter((project) => !project.shot)
  const numberOf = (project) => String(projects.indexOf(project) + 1).padStart(2, '0')

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          text={copy.projects.text}
        />

        <div className="project-grid project-grid--featured">
          {withShot.map((project) => (
            /*
             * Same shape as a certificate card: optional preview on top, body
             * below. The card is an <article> because it carries its own demo
             * and repo links — an anchor cannot nest inside an anchor — and the
             * title link is stretched over the whole card in CSS instead.
             */
            <article className="card project-card" key={project.slug}>
              {project.shot && (
                <div className="project-card__shot">
                  <img src={project.shot} alt="" loading="lazy" decoding="async" />
                </div>
              )}

              <div className="project-card__body">
                <div className="project-card__top mono">
                  <span>{project.category}</span>
                  <span>{numberOf(project)}</span>
                </div>

                <h3>
                  <Link
                    className="project-card__link"
                    to={`/projects/${project.slug}`}
                    onClick={() => track('project_open', { project: project.slug })}
                  >
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
                  <div className="project-card__foot">
                    {project.demo && (
                      <a
                        className="text-link"
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => track('demo_click', { project: project.slug })}
                      >
                        <PlayCircle size={15} aria-hidden="true" />{copy.projects.demo}
                      </a>
                    )}
                    {project.repo && (
                      <a
                        className="text-link"
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => track('repo_click', { project: project.slug })}
                      >
                        <Github size={14} aria-hidden="true" />GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>

        <div className="project-grid project-grid--compact">
          {textOnly.map((project) => (
            <article className="card project-card" key={project.slug}>
              <div className="project-card__body">
                <div className="project-card__top mono">
                  <span>{project.category}</span>
                  <span>{numberOf(project)}</span>
                </div>

                <h3>
                  <Link
                    className="project-card__link"
                    to={`/projects/${project.slug}`}
                    onClick={() => track('project_open', { project: project.slug })}
                  >
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

                {project.repo && (
                  <div className="project-card__foot">
                    <a
                      className="text-link"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track('repo_click', { project: project.slug })}
                    >
                      <Github size={14} aria-hidden="true" />GitHub
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
