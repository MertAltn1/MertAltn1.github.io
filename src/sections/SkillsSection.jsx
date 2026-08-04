import SectionHeading from '../components/common/SectionHeading'
import { skillGroups } from '../data/skills'

export default function SkillsSection() {
  return (
    <section className="section section--tint" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Capabilities"
          title="A broad technical foundation"
          text="Most useful where product interfaces meet backend logic, testing, and operational systems."
        />

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div className="skill-group" key={group.title}>
              <span className="skill-group__index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3>{group.title}</h3>
              <div className="tag-row">
                {group.items.map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
