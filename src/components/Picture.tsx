import { useState } from 'react'
import styles from './Picture.module.css'

interface PictureProps {
  src?: string // leave empty to show the placeholder
  alt: string
  width: number
  height: number
  placeholderLabel?: string
  placeholderFile?: string
  flat?: boolean // true = no rounded corners or shadow (used inside cards)
}

function Picture({
  src,
  alt,
  width,
  height,
  placeholderLabel = 'Photo placeholder',
  placeholderFile,
  flat = false,
}: PictureProps) {
  // Remembers an address that failed to load, so we can show the placeholder instead
  const [failedSrc, setFailedSrc] = useState<string | undefined>()
  const showImage = Boolean(src) && src !== failedSrc

  return (
    <div
      className={`${styles.frame} ${flat ? styles.flat : ''}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={styles.image}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div role="img" aria-label={alt} className={styles.placeholder}>
          <div className={styles.box} aria-hidden="true">
            <span className={styles.badge}>Placeholder</span>
            <strong className={styles.label}>{placeholderLabel}</strong>
            <span>
              {width} × {height} px · WebP
            </span>
            {placeholderFile && <span className={styles.file}>{placeholderFile}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Picture