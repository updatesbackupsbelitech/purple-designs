import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      // A thin invisible band across the upper-middle of the screen.
      // The section crossing that band is the "active" one.
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))

    // Cleanup: stop watching when the component disappears
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}