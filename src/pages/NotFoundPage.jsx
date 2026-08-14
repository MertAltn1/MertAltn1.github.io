import Button from '../components/common/Button'
import { useLanguage } from '../hooks/useLanguage'

export default function NotFoundPage() {
  const { t } = useLanguage()
  return (
    <section className="not-found container">
      <span className="eyebrow">404</span>
      <h1>{t.notFound.title}</h1>
      <p className="lead">{t.notFound.text}</p>
      <Button to="/">{t.notFound.back}</Button>
    </section>
  )
}
