import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import useReveal from '../hooks/useReveal'
import { categories, products } from '../data/products'
import styles from './MenuPreview.module.css'

export default function MenuPreview() {
  const [active, setActive] = useState('All')
  const ref = useReveal()
  const shown = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <section id="menu-preview" ref={ref} className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} reveal`}>
          Pick your <em>poison.</em>
        </h2>

        <div className={`${styles.tabs} reveal`} role="tablist" aria-label="Menu categories" style={{ '--delay': '0.1s' }}>
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              className={`${styles.tab} ${active === c ? styles.active : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.grid} key={active}>
          {shown.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 0.1} />
          ))}
        </div>

        <div className={styles.more}>
          <Link to="/menu">View Full Menu →</Link>
        </div>
      </div>
    </section>
  )
}
