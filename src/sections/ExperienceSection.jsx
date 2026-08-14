import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../components/common/CompanyLogo'
import SectionHeading from '../components/common/SectionHeading'
import { experiences } from '../data/experiences'
import { copy } from '../data/copy'

export default function ExperienceSection() {
  return (
    <section className="section section--tint" id="experience">
      <div className="container">
        <SectionHeading
          eyebrow={copy.experience.eyebrow}
          title={copy.experience.title}
          text={copy.experience.text}
        />

        <ol className="experience-list">
          {experiences.map((item) => (
            <li key={item.slug}>
              <Link className="experience-row" to={`/experience/${item.slug}`}>
                <div className="experience-row__stamp">
                  <span className="experience-row__period mono">{item.period}</span>
                  <CompanyLogo name={item.company} src={item.logo} />
                </div>

                <div className="experience-row__body">
                  <h3>{item.role}</h3>
                  <p className="experience-row__meta">
                    <span className="experience-row__company">{item.company}</span>
                    {' · '}{item.type}{item.location ? ` · ${item.location}` : ''}
                  </p>
                  <p className="experience-row__summary">{item.summary}</p>
                </div>

                <div className="tag-row experience-row__tags">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span className="tag" key={tech}>{tech}</span>
                  ))}
                </div>

                <ArrowUpRight className="experience-row__arrow" size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>

        <p className="experience-continuation mono">
          {copy.experience.continued}
        </p>
      </div>
    </section>
  )
}
