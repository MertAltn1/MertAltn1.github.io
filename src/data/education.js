export const education = {
  institution: 'Bilkent University',
  program: 'B.S. Computer Technology and Information Systems (CTIS)',
  status: '3rd year undergraduate',
  location: 'Ankara, Türkiye',
  startYear: '2023',
  expectedGraduation: '2028',
  gpa: '3.79',
  latestTermGpa: '3.79',
  ranking: '9 / 91',
  // Mean of the four section scores (6.5 + 5.5 + 6.0 + 6.5) / 4, July 2024.
  // The Test Report Form rounds this to an overall band of 6.0, so the label
  // beside this number says "average", not "overall".
  ielts: '6.125',
  focus: ['Software engineering', 'Web technologies', 'Databases', 'Systems and infrastructure'],
}

export const englishJourney = [
  {
    title: 'English Preparatory Program',
    text: 'Started at level two and completed the full preparatory program in a single academic year.',
  },
  {
    title: 'Bilkent PAE',
    text: 'Passed the Proficiency in Academic English examination and moved directly into the department.',
  },
  {
    title: 'IELTS Academic',
    text: `Listening 6.5, Reading 5.5, Writing 6.0, Speaking 6.5 — averaging ${education.ielts} (July 2024).`,
  },
]
