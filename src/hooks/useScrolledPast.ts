import { useEffect, useState } from 'react'

export function useScrolledPast(distance: number): boolean {
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const update = () => setIsPast(window.scrollY > distance)
    update() // run once so the starting state is correct
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [distance])

  return isPast
}