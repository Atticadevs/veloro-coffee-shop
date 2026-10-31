import { useEffect, useRef } from 'react'

// Adds `.is-visible` to every `.reveal` element inside the ref'd container
// (or the container itself) once it scrolls into view.
export default function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = [...root.querySelectorAll('.reveal:not(.is-visible)')]
    if (root.classList.contains('reveal') && !root.classList.contains('is-visible')) targets.push(root)
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
  return ref
}
