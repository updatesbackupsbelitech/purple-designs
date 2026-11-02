import styles from './Picture.module.css'

interface PictureProps {
  src?: string // leave empty to show the placeholder
  alt: string
  width: number
  height: number
  placeholderLabel?: string
  placeholderFile?: string
}

function Picture({
  src,
  alt,
  width,
  height,
  placeholderLabel = 'Photo placeholder',
  placeholderFile,
}: PictureProps) {
  return (
    <div className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={styles.image}
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