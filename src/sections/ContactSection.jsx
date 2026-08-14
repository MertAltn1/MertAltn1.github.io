import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { Github, Linkedin } from '../components/common/BrandIcons'
import { site } from '../data/site'
import { copy } from '../data/copy'

/**
 * The site is static (GitHub Pages), so there is no server to post to.
 * The form composes a mailto: link instead — it opens the visitor's own mail
 * client with everything already filled in, and nothing is stored anywhere.
 */
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', reasonIndex: 0, message: '' })

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const reason = copy.contact.reasons[form.reasonIndex]
    const subject = `${reason} — ${form.name || copy.contact.enquiry}`
    const body = [
      `${copy.contact.name}: ${form.name}`,
      `${copy.contact.email}: ${form.email}`,
      form.phone && `${copy.contact.phone}: ${form.phone}`,
      `${copy.contact.reason}: ${reason}`,
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
          <span className="eyebrow">{copy.contact.eyebrow}</span>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.text}</p>

          <ul className="contact-channels">
            <li>
              <a href={`mailto:${site.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span>
                  <span className="contact-channels__label mono">{copy.contact.email}</span>
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
                  <span className="contact-channels__label mono">{copy.contact.based}</span>
                  <strong>{site.location}</strong>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="contact-name">{copy.contact.name}</label>
            <input id="contact-name" type="text" required value={form.name} onChange={update('name')} />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="contact-email">{copy.contact.email}</label>
              <input id="contact-email" type="email" required value={form.email} onChange={update('email')} />
            </div>
            <div className="field">
              <label htmlFor="contact-phone">{copy.contact.phone} <span className="field__hint">{copy.contact.optional}</span></label>
              <input id="contact-phone" type="tel" value={form.phone} onChange={update('phone')} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-reason">{copy.contact.reason}</label>
            <select id="contact-reason" value={form.reasonIndex} onChange={update('reasonIndex')}>
              {copy.contact.reasons.map((reason, index) => <option value={index} key={reason}>{reason}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="contact-message">{copy.contact.message}</label>
            <textarea id="contact-message" rows="4" required value={form.message} onChange={update('message')} />
          </div>

          <button className="button button--primary" type="submit">
            {copy.contact.submit}<Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}
