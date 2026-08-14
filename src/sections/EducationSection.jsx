import { FileText } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { education } from '../data/education'
import { PROGRAM, fill } from '../data/translations'
import { useLanguage } from '../hooks/useLanguage'

export default function EducationSection() {
  const { t } = useLanguage()
  // Order matches t.education.metrics; the scholarship value is localised too
  // ("Top 2%" / "İlk %2"), so it comes from the translation table, not the data.
  const metrics = [education.gpa, t.education.scholarship, education.ielts, education.expectedGraduation]
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          eyebrow={t.education.eyebrow}
          title={t.education.institution}
          text={[
            PROGRAM,
            t.education.status,
            fill(t.education.since, { year: education.startYear }),
            education.location,
          ].join(' · ')}
        />

        <div className="metric-row">
          {metrics.map((value, index) => (
            <div className="metric" key={t.education.metrics[index]}>
              <span className="metric__value">{value}</span>
              <span className="metric__label">{t.education.metrics[index]}</span>
            </div>
          ))}
        </div>

        <div className="education-grid">
          <div>
            <h3 className="subheading">{t.education.academic}</h3>
            <ul className="focus-list">
              {t.education.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="subheading">{t.education.english}</h3>
            <ol className="timeline">
              {t.education.journey.map((step) => (
                <li className="timeline__item" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                  {step.href && (
                    <a className="certificate-file" href={step.href} target="_blank" rel="noreferrer">
                      <FileText size={14} aria-hidden="true" />{t.education.certificate}
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
