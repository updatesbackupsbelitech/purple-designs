import { useEffect, useId, useRef } from 'react'
import Icon from './Icon'
import styles from './AlertDialog.module.css'

interface AlertDialogProps {
  type: 'success' | 'error'
  title: string
  message: string
  buttonLabel?: string
  onClose: () => void
}

function AlertDialog({ type, title, message, buttonLabel = 'Done', onClose }: AlertDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const uid = useId()
  const titleId = `${uid}-title`
  const textId = `${uid}-text`

  // Open as a modal, lock page scrolling, and return focus to the button that was used
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      if (dialog.open) dialog.close()
      previouslyFocused?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      role="alertdialog"
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={textId}
      // The Esc key makes the browser close the dialog, and this tells React
      onClose={() => {
        if (!dialogRef.current?.open) onClose()
      }}
      // A click on the dark area (outside the white panel) closes it
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={styles.panel}>
        <div className={`${styles.badge} ${type === 'success' ? styles.success : styles.error}`}>
          {type === 'success' ? (
            <svg viewBox="0 0 56 56" width="56" height="56" aria-hidden="true" focusable="false">
              <circle className={styles.circle} cx="28" cy="28" r="26" />
              <path className={styles.tick} d="M16 29l8 8 16-17" />
            </svg>
          ) : (
            <Icon name="alert" size={44} />
          )}
        </div>

        <h3 id={titleId} className={styles.title}>
          {title}
        </h3>
        <p id={textId} className={styles.text}>
          {message}
        </p>

        <button type="button" className={styles.button} onClick={onClose}>
          {buttonLabel}
        </button>
      </div>
    </dialog>
  )
}

export default AlertDialog