export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-grid__aside">
          <span className="eyebrow">About</span>
          <h2>I learn by building, so I keep putting myself where real systems are.</h2>
        </div>

        <div className="about-grid__body">
          <p>
            I started at Bilkent University in 2023. I entered the English preparatory program at
            level two and finished the whole program in a single year, then moved straight into
            Computer Technology and Information Systems.
          </p>
          <p>
            Reading about something has never been enough for me — it only sticks once I have
            built it, broken it, and fixed it. That is why I keep interning. Every placement puts
            me in front of a system that already has users, constraints, and consequences, and
            that is where the learning actually happens.
          </p>
          <p>
            So far that has meant automating CRM test flows at Turkcell, administering RHEL
            servers under least-privilege rules, and building inventory tracking and reporting
            interfaces at Baykar. Different problems, same habit: understand the system, then make
            it clearer for the next person who touches it.
          </p>
          <p>
            My work now spans frontend development, backend foundations, browser automation,
            databases, and Linux infrastructure — enough range to see software as one connected
            system rather than a pile of separate technologies.
          </p>
        </div>
      </div>
    </section>
  )
}
