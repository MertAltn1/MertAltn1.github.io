import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { Github, Linkedin } from '../components/common/BrandIcons'
import { site } from '../data/site'

const REASONS = [
  'Internship opportunity',
  'New grad / full-time role',
  'Freelance or project work',
  'Something else',
]

/**
 * The site is static (GitHub Pages), so there is no server to post to.
 * The form composes a mailto: link instead — it opens the visitor's own mail
 * client with everything already filled in, and nothing is stored anywhere.
 */
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: REASONS[0], message: '' })

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = `${form.reason} — ${form.name || 'Portfolio enquiry'}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `Reason: ${form.reason}`,
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
          <span className="eyebrow">Contact</span>
          <h2>Interested in building something useful together?</h2>
          <p>
            I am always glad to discuss software, systems, internships, and thoughtful engineering
            work. Fill in the form and it will open in your own mail client — or write to me
            directly.
          </p>

          <ul className="contact-channels">
            <li>
              <a href={`mailto:${site.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span>
                  <span className="contact-channels__label mono">Email</span>
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
                    <strong>Connect</strong>
                  </span>
                </a>
              </li>
            )}
            <li>
              <div>
                <MapPin size={17} aria-hidden="true" />
                <span>
                  <span className="contact-channels__label mono">Based in</span>
                  <strong>{site.location}</strong>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" type="text" required value={form.name} onChange={update('name')} />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" required value={form.email} onChange={update('email')} />
            </div>
            <div className="field">
              <label htmlFor="contact-phone">Phone <span className="field__hint">optional</span></label>
              <input id="contact-phone" type="tel" value={form.phone} onChange={update('phone')} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-reason">Reason for contact</label>
            <select id="contact-reason" value={form.reason} onChange={update('reason')}>
              {REASONS.map((reason) => <option key={reason}>{reason}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" rows="4" required value={form.message} onChange={update('message')} />
          </div>

          <button className="button button--primary" type="submit">
            Compose email<Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}
