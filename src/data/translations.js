/**
 * Site copy in both languages.
 *
 * The Turkish is written as Turkish — not translated sentence by sentence from
 * the English. Word order, idiom, and register are chosen for a Turkish reader,
 * so the two versions say the same thing without mirroring each other's grammar.
 *
 * Strings with a `{placeholder}` are filled by `fill()` below, because the two
 * languages put the value in different positions ("since 2023" vs "2023’ten
 * beri"). Never build those by concatenation.
 */

export function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '')
}

// Kept in English in both languages — it is the department's own name.
export const PROGRAM = 'CTIS — Computer Technology and Information Systems'

export const translations = {
  en: {
    language: { label: 'Select language' },
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
      text: 'Five internships across defense, telecom, and banking technology — each one a system that already had users, constraints, and consequences.',
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
  },

  tr: {
    language: { label: 'Dil seçin' },
    nav: { about: 'Hakkımda', experience: 'Deneyim', projects: 'Projeler', skills: 'Yetenekler', education: 'Eğitim', certificates: 'Sertifikalar', contact: 'İletişim' },
    a11y: { sections: 'Bölümler', toggleNav: 'Menüyü aç/kapat', skip: 'İçeriğe geç', home: 'ana sayfa', loading: 'Yükleniyor…' },
    theme: { light: 'Açık temaya geç', dark: 'Koyu temaya geç' },
    hero: {
      role: 'Yazılım Mühendisi',
      subtitle: 'Bilkent Üniversitesi · CTIS',
      lead: 'Bilkent Üniversitesi CTIS bölümünde üçüncü sınıf öğrencisiyim; farklı teknolojiler ve profesyonel ortamlarda uygulamalı yazılım mühendisliği deneyimi edindim. Farklı şirketlerde yaptığım stajlarla akademide öğrendiklerimi sahadaki gerçek projelere ve sistemlere aktarıyorum.',
      work: 'Projelerim',
      cv: 'CV’mi indir',
      contact: 'İletişime geç',
      portraitAlt: '{name} fotoğrafı',
      gpa: 'GPA',
      scholarship: 'Başarı Bursu · İlk %2',
    },
    about: {
      eyebrow: 'Hakkımda',
      title: 'Yaparak öğreniyorum; o yüzden kendimi sürekli gerçek sistemlerin içinde tutuyorum.',
      paragraphs: [
        'Bilkent Üniversitesi’ne 2023’te başladım. İngilizce hazırlığa ikinci kurdan girdim, programın tamamını tek yılda bitirdim ve doğrudan CTIS bölümüne geçtim.',
        'Bir konuyu okumak bana hiçbir zaman yetmedi; ancak kurup bozduğumda ve tekrar toparladığımda kalıcı oluyor. Sürekli staj yapmamın sebebi de bu. Her staj beni kullanıcısı, kısıtı ve sonucu olan gerçek bir sistemin karşısına çıkarıyor; öğrenmenin asıl gerçekleştiği yer de orası.',
        'Bugüne kadar Turkcell’de CRM test akışlarını otomatikleştirdim, en az yetki prensibiyle RHEL sunucuları yönettim, Baykar’da kurum içi bir sistemin uçtan uca geliştirilmesinde çalıştım. Problemler farklı ama alışkanlık aynı: önce sistemi anla, sonra ona dokunacak bir sonraki kişi için daha anlaşılır bırak.',
        'Şu anda frontend geliştirme, backend temelleri, tarayıcı otomasyonu, veritabanları ve Linux altyapısı arasında çalışıyorum. Bu genişlik yazılımı ayrı teknolojiler yığını olarak değil, birbirine bağlı tek bir sistem olarak görmemi sağlıyor.',
      ],
    },
    experience: {
      eyebrow: 'Deneyim',
      title: 'Gerçek sistemlerin içinde öğrenmek',
      text: 'Savunma, telekom ve bankacılık teknolojilerinde beş staj — her biri kullanıcısı, kısıtı ve sonucu olan gerçek sistemler.',
      continued: 'Devam ediyor — yeni deneyimler buraya eklenecek.',
      all: 'Tüm deneyimler',
      contribution: 'Yaptığım işler',
      tools: 'Araçlar ve kapsam',
      fallbackNote: 'Burada yalnızca işin genel çerçevesini anlatıyorum; kurum içi ve gizli ayrıntılara bilerek girmiyorum.',
    },
    projects: {
      eyebrow: 'Seçili çalışmalar',
      title: 'Gerçek bir problemi çözen projeler',
      text: 'Bilgiyi daha anlaşılır, testi daha güvenli ve günlük işi daha hızlı hale getirmek için kurulmuş arayüzler ve sistemler.',
      all: 'Tüm projeler',
      challenge: 'Problem',
      outcomes: 'Öne çıkanlar',
      technology: 'Teknolojiler',
      source: 'Kaynak kodu',
      confidential: 'Bu çalışmada şirkete ait veriler, kurum içi adresler, kimlik bilgileri ve uygulama ayrıntıları bilinçli olarak yer almıyor.',
    },
    skills: {
      eyebrow: 'Yetkinlikler',
      title: 'Geniş bir teknik temel',
      text: 'En çok, ürün arayüzünün backend mantığı, testler ve operasyonel sistemlerle kesiştiği yerde işe yarıyorum.',
      groups: ['Diller', 'Web mühendisliği', 'Veri ve kalite', 'Sistemler ve araçlar'],
    },
    education: {
      eyebrow: 'Eğitim',
      institution: 'Bilkent Üniversitesi',
      status: '3. sınıf lisans öğrencisi',
      since: '{year}’ten beri',
      metrics: ['Güncel ortalama', 'Başarı bursu', 'IELTS ortalaması', 'Beklenen mezuniyet'],
      scholarship: 'İlk %2',
      academic: 'Akademik odak',
      english: 'İngilizce yeterliliği',
      certificate: 'Sertifika',
      focus: ['Yazılım mühendisliği', 'Web teknolojileri', 'Veritabanları', 'Sistemler ve altyapı'],
      journey: [
        { title: 'İngilizce Hazırlık Programı', text: 'İkinci kurdan başladım ve programın tamamını tek akademik yılda bitirdim.' },
        { title: 'Bilkent PAE', text: 'Akademik İngilizce Yeterlik Sınavı’nı geçerek doğrudan bölüme başladım.' },
        { title: 'IELTS Academic', text: 'Dinleme 6.5, Okuma 5.5, Yazma 6.0, Konuşma 6.5 — ortalama 6.125 (Temmuz 2024).' },
      ],
    },
    certificates: {
      eyebrow: 'Sertifikalar',
      title: 'Tamamladığım programlar',
      text: 'Bulut, Linux, makine öğrenmesi ve kurumsal sistemler alanında tamamladığım bootcamp, akademi ve staj programları. Belgelerin hepsi sayfada — sadece yazmakla kalmıyorum.',
      pdf: 'PDF’yi aç',
      open: 'Sertifikayı PDF olarak aç:',
      repo: 'Proje deposu',
    },
    contact: {
      eyebrow: 'İletişim',
      title: 'Birlikte işe yarar bir şey geliştirelim mi?',
      text: 'Yazılım, sistemler, stajlar ve iyi mühendislik üzerine konuşmaktan memnuniyet duyarım. Formu doldurduğunuzda kendi e-posta uygulamanız açılır; dilerseniz doğrudan da yazabilirsiniz.',
      based: 'Konum',
      name: 'Adınız',
      email: 'E-posta',
      phone: 'Telefon',
      optional: 'isteğe bağlı',
      reason: 'Konu',
      message: 'Mesajınız',
      submit: 'E-postayı oluştur',
      reasons: ['Staj fırsatı', 'Yeni mezun / tam zamanlı pozisyon', 'Freelance veya proje işi', 'Diğer'],
      enquiry: 'Portfolyo üzerinden iletişim',
    },
    footer: { text: 'Yazılım mühendisliği, test otomasyonu ve bunların altındaki sistemler.' },
    notFound: { title: 'Böyle bir sayfa yok.', text: 'Adres değişmiş ya da eksik yazılmış olabilir.', back: 'Ana sayfaya dön' },
  },
}
