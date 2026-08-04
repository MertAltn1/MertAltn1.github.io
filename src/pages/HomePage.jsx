import Hero from '../sections/Hero'
import AboutSection from '../sections/AboutSection'
import ExperienceSection from '../sections/ExperienceSection'
import ProjectsSection from '../sections/ProjectsSection'
import SkillsSection from '../sections/SkillsSection'
import EducationSection from '../sections/EducationSection'
import CertificatesSection from '../sections/CertificatesSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <CertificatesSection />
      <ContactSection />
    </>
  )
}
