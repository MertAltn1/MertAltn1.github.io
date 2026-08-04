// Single source of truth for the one-page layout: section ids, their labels,
// and which ones surface in the header. Nav, scroll-spy, and HomePage all read
// from here so they can never drift apart.
export const sections = [
  { id: 'about', label: 'About', nav: true },
  { id: 'experience', label: 'Experience', nav: true },
  { id: 'projects', label: 'Projects', nav: true },
  { id: 'skills', label: 'Skills', nav: true },
  { id: 'education', label: 'Education', nav: true },
  { id: 'certificates', label: 'Certificates', nav: false },
  { id: 'contact', label: 'Contact', nav: true },
]

export const navSections = sections.filter((section) => section.nav)

// Stable array identity — passed straight into useScrollSpy's effect deps.
export const navSectionIds = navSections.map((section) => section.id)
