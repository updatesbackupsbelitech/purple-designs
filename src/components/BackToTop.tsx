import { useScrolledPast } from '../hooks/useScrolledPast'
import styles from './BackToTop.module.css'

function BackToTop() {
  const visible = useScrolledPast(600)

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default BackToTop