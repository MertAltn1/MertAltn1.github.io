import { FileText } from 'lucide-react'
import { Github } from '../components/common/BrandIcons'
import SectionHeading from '../components/common/SectionHeading'
import { certificates } from '../data/certificates'
import { useLanguage } from '../hooks/useLanguage'

export default function CertificatesSection() {
  const { t, localize } = useLanguage()
  return (
    <section className="section section--tint" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow={t.certificates.eyebrow}
          title={t.certificates.title}
          text={t.certificates.text}
        />

        <ul className="certificate-grid">
          {certificates.map((rawCertificate) => {
            const certificate = localize(rawCertificate)
            return (
            <li className="certificate-card" key={certificate.title}>
              {certificate.preview && (
                <a
                  className="certificate-card__scan"
                  href={certificate.file}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t.certificates.open} ${certificate.title}`}
                >
                  <img src={certificate.preview} alt="" loading="lazy" decoding="async" />
                  <span className="certificate-card__zoom">
                    <FileText size={14} aria-hidden="true" />{t.certificates.pdf}
                  </span>
                </a>
              )}

              <div className="certificate-card__body">
                <p className="certificate-card__issuer mono">{certificate.issuer}</p>
                <h3>{certificate.title}</h3>
                <p className="certificate-card__desc">{certificate.description}</p>

                <div className="certificate-card__foot">
                  {certificate.detail && <span className="tag">{certificate.detail}</span>}
                  {certificate.repo && (
                    <a className="text-link" href={certificate.repo} target="_blank" rel="noreferrer">
                      <Github size={14} aria-hidden="true" />{t.certificates.repo}
                    </a>
                  )}
                </div>
              </div>
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
