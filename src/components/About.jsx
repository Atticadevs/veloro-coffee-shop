import PlaceholderImg from './PlaceholderImg'
import useReveal from '../hooks/useReveal'
import styles from './About.module.css'

const mosaic = [
  { name: 'Freshly roasted beans', color: '#6B2F12', src: '/images/about-beans.jpg' },
  { name: 'Slow cold-drip brewing', color: '#C4411A', src: '/images/about-brewing.jpg', position: '45% center' },
  { name: 'Handcrafted by our baristas', color: '#A8582A', src: '/images/about-hands.jpg' },
  { name: 'Poured over ice', color: '#D4895A', src: '/images/about-pour.jpg' },
]
const stats = ['18h cold steep', '100% single origin', '3 locations', '12k cups a week']

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" ref={ref} className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.mosaic}>
          {mosaic.map((m, i) => (
            <div key={m.name} className={`${styles.tile} ${i % 2 ? styles.down : ''} reveal ${styles.fromLeft}`} style={{ '--delay': `${i * 0.12}s` }}>
              <PlaceholderImg name={m.name} color={m.color} src={m.src} position={m.position} />
            </div>
          ))}
        </div>

        <div className={`${styles.text} reveal ${styles.fromRight}`}>
          <p className={styles.eyebrow}>Our philosophy</p>
          <h2 className={styles.heading}>Good coffee shouldn’t be rushed.</h2>
          <p className={styles.body}>
            We steep every batch for 18 hours in small tanks, using beans roasted
            a few streets from our counter. No shortcuts, no syrups from a bag —
            just cold, bold coffee made the slow way and served ice-cold.
          </p>
          <ul className={styles.stats}>
            {stats.map((s) => (
              <li key={s} className={styles.pill}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
