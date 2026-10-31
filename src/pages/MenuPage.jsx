import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import useReveal from '../hooks/useReveal'
import { categories, products } from '../data/products'
import styles from './MenuPage.module.css'

export default function MenuPage() {
  const [active, setActive] = useState('All')
  const ref = useReveal()
  const shown = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <div ref={ref} className={styles.page}>
      <div className={styles.container}>
        <h1 className={`${styles.heading} reveal`}>The <em>menu.</em></h1>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Categories">
            <ul className={styles.cats}>
              {categories.map((c) => (
                <li key={c}>
                  <button
                    className={`${styles.cat} ${active === c ? styles.active : ''}`}
                    onClick={() => setActive(c)}
                    aria-pressed={active === c}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.main}>
            {shown.length === 0 ? (
              <p>Nothing here yet.</p>
            ) : (
              <div className={styles.grid} key={active}>
                {shown.map((p, i) => (
                  <ProductCard key={p.id} product={p} delay={i * 0.08} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
