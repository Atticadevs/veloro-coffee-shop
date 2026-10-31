import useReveal from '../hooks/useReveal'
import styles from './Testimonials.module.css'

const reviews = [
  { name: 'Maya R.', quote: 'The caramel cold brew ruined all other iced coffee for me. Smooth, never bitter.', initial: 'M' },
  { name: 'Jonas K.', quote: 'I drive across town for the Mango Cold Wave. Summer in a cup, no exaggeration.', initial: 'J' },
  { name: 'Priya S.', quote: 'Bold, cold, and the staff remember my order. Veloro is my daily ritual now.', initial: 'P' },
]

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} reveal`}>
          Loved <em>cold.</em>
        </h2>
        <div className={styles.grid}>
          {reviews.map((r, i) => (
            <figure key={r.name} className={`${styles.card} reveal`} style={{ '--delay': `${i * 0.1}s` }}>
              <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className={styles.quote}>“{r.quote}”</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">{r.initial}</span>
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
