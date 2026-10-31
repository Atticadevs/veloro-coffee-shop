import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useScrolled from '../hooks/useScrolled'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

const links = [
  { to: '/#about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/#locations', label: 'Locations' },
]

export default function Navbar() {
  const scrolled = useScrolled()
  const { cartCount } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.menuOpen : ''}`}>
      <nav className={styles.inner} aria-label="Main">
        <Link to="/" className={styles.wordmark}>Veloro</Link>

        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.label}>
              <NavLink to={l.to} className={styles.link}>{l.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <Link to="/menu" className={styles.order}>Order Now</Link>
          <Link to="/cart" className={styles.cart} aria-label={`Cart, ${cartCount} items`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
          <button
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={open ? styles.barOpen : ''} />
          </button>
        </div>
      </nav>
    </header>

    <div id="mobile-menu" className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`} aria-hidden={!open}>
        {links.map((l) => (
          <Link key={l.label} to={l.to} tabIndex={open ? 0 : -1}>{l.label}</Link>
        ))}
        <Link to="/cart" tabIndex={open ? 0 : -1}>Cart ({cartCount})</Link>
        <Link to="/menu" className={styles.order} tabIndex={open ? 0 : -1}>Order Now</Link>
    </div>
    </>
  )
}
