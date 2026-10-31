import { useState } from 'react'
import PlaceholderImg from './PlaceholderImg'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className={`${styles.card} reveal`} style={{ '--delay': `${delay}s` }}>
      <div className={styles.imgWrap}>
        <PlaceholderImg name={product.name} color={product.color} src={product.image} />
        <span className={styles.tag}>{product.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.note}>{product.note}</p>
        <div className={styles.foot}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button className={styles.add} onClick={handleAdd} aria-live="polite">
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
