import { FileText } from 'lucide-react'
import { Github } from '../components/common/BrandIcons'
import SectionHeading from '../components/common/SectionHeading'
import { certificates } from '../data/certificates'
import { copy } from '../data/copy'
import { useDragScroll } from '../hooks/useDragScroll'

export default function CertificatesSection() {
  const rail = useDragScroll()

  return (
    <section className="section section--tint" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow={copy.certificates.eyebrow}
          title={copy.certificates.title}
          text={copy.certificates.text}
        />

        {/*
          A rail rather than a grid: the documents all look alike, so reading
          them left to right suits them, and eight cards no longer take over
          the page. tabIndex makes the arrow keys reachable without a mouse.
        */}
        <ul className="certificate-rail" ref={rail} tabIndex={0} aria-label={copy.certificates.title}>
          {certificates.map((certificate) => (
            <li
              className={`certificate-card${certificate.preview ? '' : ' certificate-card--plain'}`}
              key={certificate.title}
            >
              {certificate.preview && (
                <a
                  className="certificate-card__scan"
                  href={certificate.file}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${copy.certificates.open} ${certificate.title}`}
                >
                  <img src={certificate.preview} alt="" loading="lazy" decoding="async" />
                  <span className="certificate-card__zoom">
                    <FileText size={14} aria-hidden="true" />{copy.certificates.pdf}
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
                      <Github size={14} aria-hidden="true" />{copy.certificates.repo}
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="rail-hint mono">{copy.certificates.hint}</p>
      </div>
    </section>
  )
}
