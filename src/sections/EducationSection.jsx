import { FileText } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { education, englishJourney } from '../data/education'
import { useLanguage } from '../hooks/useLanguage'

export default function EducationSection() {
  const { language, t } = useLanguage()
  const metrics = [education.gpa, education.ranking, education.ielts, education.expectedGraduation]
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          eyebrow={t.education.eyebrow}
          title={language === 'tr' ? 'Bilkent Üniversitesi' : education.institution}
          text={`${language === 'tr' ? 'Bilgisayar Teknolojisi ve Bilişim Sistemleri Lisans Programı (CTIS)' : education.program} · ${t.education.status} · ${t.education.since} ${education.startYear} · ${education.location}`}
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
              {(language === 'tr' ? t.education.journey : englishJourney).map((step) => (
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
