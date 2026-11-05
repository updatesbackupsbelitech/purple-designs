import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react'
import type { Project } from '../data/projects'
import { cloudinaryFit } from '../utils/cloudinary'
import Picture from './Picture'
import styles from './Lightbox.module.css'

interface LightboxProps {
  items: Project[] // the projects currently shown in the grid
  startIndex: number // which one was clicked
  onClose: () => void
}

type Direction = 'none' | 'next' | 'prev'

const CLOSE_DELAY = 200 // milliseconds. Must match the fade-out time in the CSS.
const TITLE_ID = 'lightbox-title'

function Lightbox({ items, startIndex, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStartX = useRef<number | null>(null)

  const [index, setIndex] = useState(startIndex)
  const [direction, setDirection] = useState<Direction>('none')
  const [closing, setClosing] = useState(false)
  const [failedId, setFailedId] = useState<string | null>(null)

  const total = items.length
  const project = items[index]
  const hasMany = total > 1

  // 1. Open the dialog, lock page scrolling, and give focus back to the card on exit
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

  // 2. Closing: fade out first, then tell the parent to remove us
  useEffect(() => {
    if (!closing) return
    const timer = window.setTimeout(onClose, CLOSE_DELAY)
    return () => window.clearTimeout(timer)
  }, [closing, onClose])

  // 3. Start downloading the next and previous photos so arrows feel instant
  useEffect(() => {
    if (!hasMany) return
    const neighbours = [(index + 1) % total, (index - 1 + total) % total]
    neighbours.forEach((i) => {
      const id = items[i].imageId
      if (id) new Image().src = cloudinaryFit(id)
    })
  }, [index, items, total, hasMany])

  const requestClose = () => setClosing(true)

  const go = (step: 1 | -1) => {
    setDirection(step === 1 ? 'next' : 'prev')
    setIndex((current) => (current + step + total) % total)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!hasMany) return
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  // A click on the dark area itself (not on the photo or buttons) closes the viewer
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) requestClose()
  }

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null || !hasMany) return
    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) < 50) return // too short to be a swipe
    go(distance < 0 ? 1 : -1)
  }

  const slideClasses: Record<Direction, string> = {
    none: styles.zoomIn,
    next: styles.fromRight,
    prev: styles.fromLeft,
  }

  const showImage = Boolean(project.imageId) && failedId !== project.id

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${closing ? styles.closing : ''}`}
      aria-labelledby={TITLE_ID}
      onCancel={(event) => {
        // The Esc key: use our fade-out instead of closing instantly
        event.preventDefault()
        requestClose()
      }}
      onClose={() => {
        // Safety net: if the browser closed the dialog itself, close ours too
        if (!dialogRef.current?.open) onClose()
      }}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className={`${styles.control} ${styles.close}`}
        aria-label="Close project viewer"
        onClick={requestClose}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path
            d="M6 6l12 12M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            className={`${styles.control} ${styles.prev}`}
            aria-label="Previous project"
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.control} ${styles.next}`}
            aria-label="Next project"
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className={styles.counter} aria-hidden="true">
            {index + 1} / {total}
          </p>
        </>
      )}

      {/* Changing the key makes React replace the figure, which replays the animation */}
      <figure key={project.id} className={`${styles.figure} ${slideClasses[direction]}`}>
        <div className={styles.media}>
          {showImage ? (
            <img
              src={cloudinaryFit(project.imageId)}
              alt={project.imageAlt}
              className={styles.image}
              onError={() => setFailedId(project.id)}
            />
          ) : (
            <div className={styles.placeholder}>
              <Picture
                src=""
                alt={project.imageAlt}
                width={1600}
                height={1200}
                placeholderLabel={project.title}
                placeholderFile={`Upload as: ${project.id}`}
              />
            </div>
          )}
        </div>

        <figcaption className={styles.caption}>
          <p className={styles.category}>{project.category}</p>
          <h3 id={TITLE_ID} className={styles.title}>
            {project.title}
          </h3>
          <p className={styles.meta}>
            {project.location} · {project.year}
          </p>
        </figcaption>
      </figure>

      {/* Tells screen-reader users which project is showing after each change */}
      <p className="visually-hidden" aria-live="polite">
        Project {index + 1} of {total}: {project.title}
      </p>
    </dialog>
  )
}

export default Lightbox