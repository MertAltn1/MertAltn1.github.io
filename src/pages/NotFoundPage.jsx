import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404</span>
      <h1>This page isn’t here.</h1>
      <p className="lead">The route may have changed, or the address may be incomplete.</p>
      <Button to="/">Back to home</Button>
    </section>
  )
}
