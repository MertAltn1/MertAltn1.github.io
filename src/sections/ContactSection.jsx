import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { Github, Linkedin } from '../components/common/BrandIcons'
import { site } from '../data/site'
import { useLanguage } from '../hooks/useLanguage'

/**
 * The site is static (GitHub Pages), so there is no server to post to.
 * The form composes a mailto: link instead — it opens the visitor's own mail
 * client with everything already filled in, and nothing is stored anywhere.
 */
export default function ContactSection() {
  const { language, t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', phone: '', reasonIndex: 0, message: '' })

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const reason = t.contact.reasons[form.reasonIndex]
    const subject = `${reason} — ${form.name || t.contact.enquiry}`
    const body = [
      `${t.contact.name}: ${form.name}`,
      `${t.contact.email}: ${form.email}`,
      form.phone && `${t.contact.phone}: ${form.phone}`,
      `${t.contact.reason}: ${reason}`,
      '',
      form.message,
    ].filter(Boolean).join('\n')

    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.text}</p>

          <ul className="contact-channels">
            <li>
              <a href={`mailto:${site.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span>
                  <span className="contact-channels__label mono">{t.contact.email}</span>
                  <strong>{site.email}</strong>
                </span>
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github size={17} aria-hidden="true" />
                <span>
                  <span className="contact-channels__label mono">GitHub</span>
                  <strong>{site.githubHandle}</strong>
                </span>
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={17} aria-hidden="true" />
                  <span>
                    <span className="contact-channels__label mono">LinkedIn</span>
                    <strong>{site.name}</strong>
                  </span>
                </a>
              </li>
            )}
            <li>
              <div>
                <MapPin size={17} aria-hidden="true" />
                <span>
                  <span className="contact-channels__label mono">{t.contact.based}</span>
                  <strong>{site.location}</strong>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="contact-name">{t.contact.name}</label>
            <input id="contact-name" type="text" required value={form.name} onChange={update('name')} />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="contact-email">{t.contact.email}</label>
              <input id="contact-email" type="email" required value={form.email} onChange={update('email')} />
            </div>
            <div className="field">
              <label htmlFor="contact-phone">{t.contact.phone} <span className="field__hint">{t.contact.optional}</span></label>
              <input id="contact-phone" type="tel" value={form.phone} onChange={update('phone')} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-reason">{t.contact.reason}</label>
            <select id="contact-reason" value={form.reasonIndex} onChange={update('reasonIndex')}>
              {t.contact.reasons.map((reason, index) => <option value={index} key={`${language}-${reason}`}>{reason}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="contact-message">{t.contact.message}</label>
            <textarea id="contact-message" rows="4" required value={form.message} onChange={update('message')} />
          </div>

          <button className="button button--primary" type="submit">
            {t.contact.submit}<Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}
