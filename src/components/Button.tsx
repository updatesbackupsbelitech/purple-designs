import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  href: string
  variant?: 'solid' | 'light' | 'outlineLight'
  children: ReactNode
}

function Button({ href, variant = 'solid', children }: ButtonProps) {
  return (
    <a href={href} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </a>
  )
}

export default Button