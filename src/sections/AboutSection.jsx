import { useLanguage } from '../hooks/useLanguage'

export default function AboutSection() {
  const { t } = useLanguage()
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-grid__aside">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2>{t.about.title}</h2>
        </div>

        <div className="about-grid__body">
          {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  )
}
