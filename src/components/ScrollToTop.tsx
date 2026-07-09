import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // `scroll-behavior: smooth` (set globally for anchor links) also applies to
    // scrollTop assignment, so it has to be disabled momentarily for the jump
    // between pages to be instant instead of animated.
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = previous
  }, [pathname])

  return null
}
