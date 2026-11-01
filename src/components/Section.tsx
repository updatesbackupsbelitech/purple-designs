import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  id: string // must match an id in navigation.ts
  title: string // the visible h2 heading
  eyebrow?: string // small label above the heading (optional)
  tone?: 'white' | 'beige' | 'lilac' // background colour
  children?: ReactNode
}

function Section({ id, title, eyebrow, tone = 'white', children }: SectionProps) {
  const titleId = `${id}-title`

  return (
    <section id={id} aria-labelledby={titleId} className={`${styles.section} ${styles[tone]}`}>
      <div className="container">
        <header className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 id={titleId}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}

export default Section