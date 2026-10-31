import styles from './PlaceholderImg.module.css'

// Shows the real photo when `src` is given; otherwise falls back to the
// coloured ☕ placeholder.
export default function PlaceholderImg({ name, color = '#D4895A', src, position = 'center', className = '' }) {
  if (src) {
    return (
      <div className={`${styles.box} ${styles.photo} ${className}`} style={{ background: color }}>
        <img src={src} alt={name} className={styles.img} style={{ objectPosition: position }} loading="lazy" />
      </div>
    )
  }
  return (
    <div
      className={`${styles.box} ${className}`}
      style={{ background: color }}
      role="img"
      aria-label={name}
    >
      <span className={styles.emoji} aria-hidden="true">☕</span>
      <span className={styles.name} aria-hidden="true">{name}</span>
    </div>
  )
}
