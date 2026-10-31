import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const socials = [
  { label: 'Instagram', d: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5h.01' },
  { label: 'X', d: 'M4 4l16 16M20 4L4 20' },
  { label: 'TikTok', d: 'M16 3v10.500a4.500 4.500 0 1 1-4.500-4.500M16 3c0 2.500 2 4.500 4.500 4.500' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <p className={styles.wordmark}>Veloro</p>
          <p className={styles.tagline}>Cold. Bold. Yours.</p>
          <p className={styles.blurb}>Iced drinks and cold brew, made the slow way since day one.</p>
        </div>
        <div>
          <h4 className={styles.title}>Quick Links</h4>
          <ul className={styles.list}>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/#locations">Locations</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>Menu</h4>
          <ul className={styles.list}>
            <li><Link to="/menu">Iced Lattes</Link></li>
            <li><Link to="/menu">Cold Brew</Link></li>
            <li><Link to="/menu">Frappes</Link></li>
            <li><Link to="/menu">Seasonal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>Follow</h4>
          <div className={styles.socials}>
            {socials.map((s) => (
              <a key={s.label} href="#top" aria-label={s.label} className={styles.social}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} Veloro Coffee. All rights reserved.</p>
    </footer>
  )
}
