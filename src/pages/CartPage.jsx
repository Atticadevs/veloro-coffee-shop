import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImg from '../components/PlaceholderImg'
import useReveal from '../hooks/useReveal'
import { useCart } from '../context/CartContext'
import styles from './CartPage.module.css'

const SHIPPING_FEE = 4
const FREE_SHIPPING_MIN = 30
const BREW_MS = 3600

export default function CartPage() {
  const { items, cartTotal, updateQty, removeFromCart, clearCart } = useCart()
  const [ordered, setOrdered] = useState(false)
  const ref = useReveal()

  const [placing, setPlacing] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const placeOrder = () => {
    setPlacing(true)
    // let the coffee animation finish before the cart is cleared
    timer.current = setTimeout(() => {
      clearCart()
      setOrdered(true)
      setPlacing(false)
    }, BREW_MS)
  }

  if (items.length === 0) {
    return (
      <div ref={ref} className={styles.page}>
        <div className={`${styles.empty} reveal`}>
          {ordered ? (
            <div className={styles.road} aria-hidden="true">
              <span className={styles.bike}>🛵</span>
              <span className={styles.lines} />
            </div>
          ) : (
            <div className={styles.cup} aria-hidden="true">☕</div>
          )}
          <h1 className={styles.emptyTitle}>{ordered ? 'Order placed!' : 'Your cup is empty'}</h1>
          <p>{ordered ? 'Thanks — our rider is on the way with your cold brew.' : 'Add something cold and bold to get started.'}</p>
          <Link to="/menu" className={styles.cta}>Browse Menu</Link>
        </div>
      </div>
    )
  }

  const tax = cartTotal * 0.08
  const shipping = cartTotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
  const orderTotal = cartTotal + tax + shipping

  return (
    <div ref={ref} className={styles.page}>
      <div className={styles.container}>
        <h1 className={`${styles.heading} reveal`}>Your <em>cart.</em></h1>
        <div className={styles.layout}>
          <ul className={styles.items}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <PlaceholderImg name={item.name} color={item.color} src={item.image} className={styles.thumb} />
                <div className={styles.info}>
                  <h2 className={styles.name}>{item.name}</h2>
                  <p className={styles.note}>{item.note}</p>
                  <button className={styles.remove} onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
                <div className={styles.right}>
                  <div className={styles.stepper}>
                    <button aria-label="Decrease quantity" onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                    <span key={item.quantity} className={styles.qty} aria-live="polite">{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className={styles.line}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>

          <aside className={styles.summary}>
            <h2 className={styles.sumTitle}>Order Summary</h2>
            <div className={styles.row}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className={styles.row}><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className={styles.row}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className={styles.hint}>Add ${(FREE_SHIPPING_MIN - cartTotal).toFixed(2)} more for free shipping.</p>
            )}
            <div className={`${styles.row} ${styles.total}`}><span>Total</span><span>${orderTotal.toFixed(2)}</span></div>
            <button className={styles.place} onClick={placeOrder} disabled={placing}>Place Order</button>
          </aside>
        </div>
      </div>

      {placing && (
        <div className={styles.brew} role="status" aria-live="polite">
          <div className={styles.brewInner}>
            <div className={styles.machine} aria-hidden="true">
              <span className={styles.stream} />
              <div className={styles.glass}>
                <span className={styles.coffee} />
                <span className={styles.foam} />
                <span className={styles.handle} />
              </div>
              <span className={`${styles.steam} ${styles.s1}`} />
              <span className={`${styles.steam} ${styles.s2}`} />
              <span className={`${styles.steam} ${styles.s3}`} />
              <span className={`${styles.bean} ${styles.b1}`}>●</span>
              <span className={`${styles.bean} ${styles.b2}`}>●</span>
              <span className={`${styles.bean} ${styles.b3}`}>●</span>
            </div>
            <p className={styles.brewText}>Brewing your order…</p>
            <p className={styles.brewDone}>Order placed ✓</p>
          </div>
        </div>
      )}
    </div>
  )
}
