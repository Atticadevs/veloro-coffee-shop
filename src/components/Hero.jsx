import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import styles from './Hero.module.css'

export default function Hero() {
  const ref = useReveal()
  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <p className={`${styles.eyebrow} reveal`}>Iced drinks &amp; cold brew specialty</p>
          <h1 className={`${styles.title} reveal`} style={{ '--delay': '0.1s' }}>
            <em>Cold.</em> Bold. Yours.
          </h1>
          <p className={`${styles.sub} reveal`} style={{ '--delay': '0.2s' }}>
            Slow-steeped for 18 hours, poured over ice, and built your way.
            The loudest, smoothest cold coffee in town.
          </p>
          <div className={`${styles.buttons} reveal`} style={{ '--delay': '0.3s' }}>
            <Link to="/menu" className={styles.primary}>Order Now</Link>
            <a href="#menu-preview" className={styles.outline}>See Menu</a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.floatWrap}>
            <img src="/images/hero.png" alt="Iced caramel cold brew splashing with coffee beans" className={styles.img} />
          </div>
          <span className={styles.badge}>Cold brewed 18h</span>
          <p className={styles.card}>“Smoother than my Monday mood.”</p>
        </div>
      </div>
    </section>
  )
}
