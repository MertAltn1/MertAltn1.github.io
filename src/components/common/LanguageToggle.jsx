import { useLanguage } from '../../hooks/useLanguage'

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className="language-toggle" role="group" aria-label={t.language.label}>
      <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={language === 'tr'} onClick={() => setLanguage('tr')}>TR</button>
    </div>
  )
}
