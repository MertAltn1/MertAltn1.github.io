export default function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <header className="section-heading">
      <div className="section-heading__body">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </header>
  )
}
