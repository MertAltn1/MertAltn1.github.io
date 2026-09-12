/**
 * Every user-facing string on the site, in one place.
 *
 * The site is English-only. Keeping the copy centralised here (rather than
 * inline in JSX) means wording changes happen in one file, and it leaves a
 * clean seam if a second language is ever added back.
 *
 * Strings with a `{placeholder}` are filled by `fill()` — never concatenate.
 */

export function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '')
}

export const PROGRAM = 'CTIS — Computer Technology and Information Systems'

export const copy = {
  nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education', certificates: 'Certificates', contact: 'Contact' },
  a11y: { sections: 'Sections', toggleNav: 'Toggle navigation', skip: 'Skip to content', home: 'home', loading: 'Loading…' },
  theme: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
  hero: {
    role: 'Software Engineer',
    subtitle: 'Bilkent University · CTIS',
    lead: 'Third-year CTIS student at Bilkent University with hands-on software engineering experience across different technologies and professional environments. Through internships at several companies, I put what I learn academically into practice on real projects and production systems.',
    work: 'View my work',
    cv: 'Download CV',
    contact: 'Get in touch',
    portraitAlt: 'Portrait of {name}',
    gpa: 'GPA',
    scholarship: 'Merit Scholarship · Top 2%',
  },
  about: {
    eyebrow: 'About',
    title: 'I learn by building, so I keep putting myself where real systems are.',
    paragraphs: [
      'I started at Bilkent University in 2023. I entered the English preparatory program at level two, finished the whole thing in a single year, and moved straight into CTIS.',
      'Reading about something has never been enough for me — it only sticks once I have built it, broken it, and put it back together. That is why I keep interning. Every placement puts me in front of a system that already has users, constraints, and consequences, and that is where the learning actually happens.',
      'So far that has meant automating CRM test flows at Turkcell, administering RHEL servers under least-privilege rules, and working on end-to-end internal system development at Baykar. Different problems, same habit: understand the system first, then leave it clearer for whoever touches it next.',
      'My work now spans frontend development, backend foundations, browser automation, databases, and Linux infrastructure — enough range to see software as one connected system rather than a pile of separate technologies.',
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Learning through real systems',
    text: 'Professional experience and development programs across product engineering, defense, telecom, and banking technology — each one an opportunity to work with real systems, constraints, and consequences.',
    continued: 'Still going — new experience will be added here.',
    all: 'All experience',
    contribution: 'What I did',
    tools: 'Tools & scope',
    fallbackNote: 'Only the general shape of the work is described here; internal and confidential details are left out on purpose.',
  },
  projects: {
    eyebrow: 'Selected work',
    title: 'Projects that solve an actual problem',
    text: 'Interfaces and systems built to make information clearer, testing safer, and everyday work faster.',
    all: 'All projects',
    challenge: 'The problem',
    outcomes: 'Key outcomes',
    technology: 'Technology',
    source: 'View source',
    demo: 'Live demo',
    demoNote: 'Runs entirely in your browser on sample data — no backend, no sign-up. The demo account is pre-filled; press LOGIN to go straight in. All people and messages are fictional.',
    screens: 'Screens',
    confidential: 'Company data, internal addresses, credentials, and implementation details are deliberately left out of this case study.',
  },
  skills: {
    eyebrow: 'Capabilities',
    title: 'A broad technical foundation',
    text: 'I am most useful where the product interface meets backend logic, testing, and operational systems.',
    groups: ['Languages', 'Web engineering', 'Data & quality', 'Systems & tools'],
  },
  education: {
    eyebrow: 'Education',
    institution: 'Bilkent University',
    status: '3rd year undergraduate',
    since: 'since {year}',
    metrics: ['Current GPA', 'Merit Scholarship', 'IELTS average', 'Expected graduation'],
    scholarship: 'Top 2%',
    academic: 'Academic focus',
    english: 'English proficiency',
    certificate: 'Certificate',
    focus: ['Software engineering', 'Web technologies', 'Databases', 'Systems and infrastructure'],
    journey: [
      { title: 'English Preparatory Program', text: 'Entered at level two and finished the entire program in a single academic year.' },
      { title: 'Bilkent PAE', text: 'Passed the Proficiency in Academic English exam and went straight into the department.' },
      { title: 'IELTS Academic', text: 'Listening 6.5, Reading 5.5, Writing 6.0, Speaking 6.5 — averaging 6.125 (July 2024).' },
    ],
  },
  certificates: {
    eyebrow: 'Certifications',
    title: 'Programs completed',
    text: 'Bootcamps, academy tracks, and internship programs across cloud, Linux, machine learning, and enterprise systems. Every document is on the page — not just claimed.',
    pdf: 'View PDF',
    open: 'Open the certificate as a PDF:',
    repo: 'Project repository',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Interested in building something useful together?',
    text: 'I am always glad to talk about software, systems, internships, and good engineering. Fill in the form and it opens in your own mail client — or just write to me directly.',
    based: 'Based in',
    name: 'Your name',
    email: 'Email',
    phone: 'Phone',
    optional: 'optional',
    reason: 'Subject',
    message: 'Message',
    submit: 'Compose email',
    reasons: ['Internship opportunity', 'New grad / full-time role', 'Freelance or project work', 'Something else'],
    enquiry: 'Portfolio enquiry',
  },
  footer: { text: 'Software engineering, test automation, and the systems underneath.' },
  notFound: { title: 'This page isn’t here.', text: 'The route may have changed, or the address may be incomplete.', back: 'Back to home' },
}
