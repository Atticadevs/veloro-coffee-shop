import useReveal from '../hooks/useReveal'
import styles from './FindUs.module.css'

const locations = [
  { name: 'Veloro — Downtown', address: '12 Bean Street, City Center', hours: 'Mon–Fri 7am–8pm' },
  { name: 'Veloro — Westside', address: '88 Coldwave Ave, West District', hours: 'Daily 8am–9pm' },
  { name: 'Veloro — Roastery', address: '4 Origin Road, Industrial Qtr', hours: 'Sat–Sun 9am–6pm' },
]

export default function FindUs() {
  const ref = useReveal()
  return (
    <section id="locations" ref={ref} className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} reveal`}>
          Find <em>us.</em>
        </h2>
        <div className={styles.grid}>
          <div className={styles.cards}>
            {locations.map((l, i) => (
              <article key={l.name} className={`${styles.card} reveal`} style={{ '--delay': `${i * 0.12}s` }}>
                <h3 className={styles.name}>{l.name}</h3>
                <p className={styles.info}>{l.address}</p>
                <p className={styles.info}>{l.hours}</p>
                <a href="#locations" className={styles.link}>Get directions →</a>
              </article>
            ))}
          </div>
          <div className={`${styles.map} reveal`} style={{ '--delay': '0.2s' }} role="img" aria-label="Map placeholder">
            {/* TODO: embed real map */}
            <span>📍 Map coming soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}
