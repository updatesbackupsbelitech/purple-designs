import { useEffect, type RefObject } from 'react'

export function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.25) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Visitors who asked for less motion get a still background
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    let frame = 0

    const update = () => {
      frame = 0
      // Stop working once the hero is well out of view
      if (window.scrollY > window.innerHeight * 1.2) return
      element.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`
    }

    const onScroll = () => {
      // Allow only one update per screen refresh
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, speed])
}