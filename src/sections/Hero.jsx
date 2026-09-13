import { ArrowDown, ArrowUpRight, Award, Download, GraduationCap, MapPin } from 'lucide-react'
import Avatar from '../components/common/Avatar'
import { Github, Linkedin } from '../components/common/BrandIcons'
import Button from '../components/common/Button'
import { site } from '../data/site'
import { education } from '../data/education'
import { quote } from '../data/quote'
import { copy, fill } from '../data/copy'
import { useSectionNav } from '../hooks/useSectionNav'
import { track } from '../lib/analytics'

export default function Hero() {
  const goToSection = useSectionNav()

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__name">{site.fullName}</h1>

          <p className="hero__role">{copy.hero.role} · {copy.hero.subtitle}</p>

          <p className="hero__lead">
            {copy.hero.lead}
          </p>

          <div className="hero__actions">
            <Button onClick={() => goToSection('projects')} icon={ArrowDown}>{copy.hero.work}</Button>
            {site.cv && (
              <Button
                href={site.cv}
                variant="secondary"
                external
                icon={Download}
                onClick={() => track('cv_click')}
              >{copy.hero.cv}</Button>
            )}
            <Button href={`mailto:${site.email}`} variant="text" icon={ArrowUpRight}>{copy.hero.contact}</Button>
          </div>

          <div className="hero__meta">
            <span><MapPin size={15} aria-hidden="true" />{site.location}</span>
            <span><GraduationCap size={15} aria-hidden="true" />{copy.hero.gpa} {education.gpa} / 4.00</span>
            <span><Award size={15} aria-hidden="true" />{copy.hero.scholarship}</span>
            {/*
              Icon-only: with the handles spelled out the row overflows its
              638px column and drops LinkedIn onto a second line. Both handles
              are written in full in the contact section.
            */}
            <span className="hero__meta-social">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub — ${site.githubHandle}`}
                title={`GitHub — ${site.githubHandle}`}
              >
                <Github size={17} />
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn — ${site.name}`}
                  title={`LinkedIn — ${site.name}`}
                >
                  <Linkedin size={17} />
                </a>
              )}
            </span>
          </div>
        </div>

        <div className="hero__portrait">
          <Avatar
            src={site.photo}
            alt={fill(copy.hero.portraitAlt, { name: site.fullName })}
            caption={site.location}
          />
          <blockquote className="hero__quote">{quote}</blockquote>
        </div>
      </div>
    </section>
  )
}
