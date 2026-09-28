import { FileText } from 'lucide-react'
import { Github } from '../components/common/BrandIcons'
import SectionHeading from '../components/common/SectionHeading'
import { certificates } from '../data/certificates'
import { copy } from '../data/copy'
import { useDragScroll } from '../hooks/useDragScroll'

function CertificateCard({ certificate, cloned, loopStart }) {
  return (
    <li
      className={`certificate-card${certificate.preview ? '' : ' certificate-card--plain'}`}
      aria-hidden={cloned || undefined}
      data-loop-start={loopStart || undefined}
    >
      {certificate.preview && (
        <a
          className="certificate-card__scan"
          href={certificate.file}
          target="_blank"
          rel="noreferrer"
          tabIndex={cloned ? -1 : undefined}
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
            <a
              className="text-link"
              href={certificate.repo}
              target="_blank"
              rel="noreferrer"
              tabIndex={cloned ? -1 : undefined}
            >
              <Github size={14} aria-hidden="true" />{copy.certificates.repo}
            </a>
          )}
        </div>
      </div>
    </li>
  )
}

export default function CertificatesSection() {
  // 0.35px per frame — about 20px a second, slow enough to read past.
  const rail = useDragScroll({ drift: 0.35 })

  return (
    <section className="section section--tint" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow={copy.certificates.eyebrow}
          title={copy.certificates.title}
          text={copy.certificates.text}
        />
      </div>

      {/*
        The rail sits outside .container so it can run edge to edge, with its
        own padding aligning the first card to the heading above.

        The list is rendered twice so the drift has something to slide in as it
        wraps. The copies are siblings, not a nested list, or the flex row
        would treat the whole second set as one item. The clone is hidden from
        assistive tech and taken out of the tab order, and its first card is
        marked so the hook knows the exact wrap distance.
      */}
      <ul
        className="certificate-rail"
        ref={rail}
        tabIndex={0}
        aria-label={copy.certificates.title}
      >
        {certificates.map((certificate) => (
          <CertificateCard certificate={certificate} key={certificate.title} />
        ))}
        {certificates.map((certificate, index) => (
          <CertificateCard
            certificate={certificate}
            cloned
            loopStart={index === 0}
            key={`clone-${certificate.title}`}
          />
        ))}
      </ul>

      <div className="container">
        <p className="rail-hint mono">{copy.certificates.hint}</p>
      </div>
    </section>
  )
}
