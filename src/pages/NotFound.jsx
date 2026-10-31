import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import styles from './NotFound.module.css'

export default function NotFound() {
  const ref = useReveal()
  return (
    <div ref={ref} className={styles.page}>
      <div className={`${styles.content} reveal`}>
        <p className={styles.code} aria-hidden="true">4<span>☕</span>4</p>
        <h1 className={styles.title}>This page <em>spilled.</em></h1>
        <p className={styles.text}>
          We couldn’t find what you were looking for. It may have been moved, or the link is wrong.
        </p>
        <div className={styles.buttons}>
          <Link to="/" className={styles.primary}>Back Home</Link>
          <Link to="/menu" className={styles.outline}>See Menu</Link>
        </div>
      </div>
    </div>
  )
}
