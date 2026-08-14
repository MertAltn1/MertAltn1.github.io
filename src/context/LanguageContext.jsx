import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './language-context'
import { translations } from '../data/translations'

function getInitialLanguage() {
  const saved = localStorage.getItem('language')
  return saved === 'tr' ? 'tr' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language],
    localize: (item) => language === 'tr' && item.tr ? { ...item, ...item.tr } : item,
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
