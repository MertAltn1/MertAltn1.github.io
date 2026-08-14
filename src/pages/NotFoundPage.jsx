import Button from '../components/common/Button'
import { copy } from '../data/copy'

export default function NotFoundPage() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404</span>
      <h1>{copy.notFound.title}</h1>
      <p className="lead">{copy.notFound.text}</p>
      <Button to="/">{copy.notFound.back}</Button>
    </section>
  )
}
