import { FileText } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { education, englishJourney } from '../data/education'

const metrics = [
  { value: education.gpa, label: 'Overall GPA' },
  { value: education.ranking, label: 'Class ranking' },
  { value: education.ielts, label: 'IELTS average' },
  { value: education.expectedGraduation, label: 'Expected graduation' },
]

export default function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title={education.institution}
          text={`${education.program} · ${education.status} since ${education.startYear} · ${education.location}`}
        />

        <div className="metric-row">
          {metrics.map(({ value, label }) => (
            <div className="metric" key={label}>
              <span className="metric__value">{value}</span>
              <span className="metric__label">{label}</span>
            </div>
          ))}
        </div>

        <div className="education-grid">
          <div>
            <h3 className="subheading">Academic focus</h3>
            <ul className="focus-list">
              {education.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="subheading">English proficiency</h3>
            <ol className="timeline">
              {englishJourney.map((step) => (
                <li className="timeline__item" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                  {step.href && (
                    <a className="certificate-file" href={step.href} target="_blank" rel="noreferrer">
                      <FileText size={14} aria-hidden="true" />Certificate
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
