import { useRef } from 'react'
import Button from '../components/Button'
import { hero } from '../data/hero'
import { siteInfo } from '../data/siteInfo'
import { useParallax } from '../hooks/useParallax'
import styles from './Hero.module.css'

function Hero() {
  const layerRef = useRef<HTMLDivElement>(null)
  useParallax(layerRef, 0.25)

  const isPhoto = hero.variant === 'photo'

  return (
    <section id="home" aria-labelledby="hero-title" className={styles.hero}>
      {/* Moving background layer (decorative, so hidden from screen readers) */}
      <div
        ref={layerRef}
        className={`${styles.layer} ${isPhoto ? styles.photo : styles.blueprint}`}
        style={isPhoto ? { backgroundImage: `url(${hero.image})` } : undefined}
        aria-hidden="true"
      />
      {isPhoto && <div className={styles.overlay} aria-hidden="true" />}

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="hero-title" className={styles.title}>
          {hero.title}
        </h1>
        <p className={styles.text}>{hero.text}</p>

        <div className={styles.actions}>
          <Button href={hero.primaryCta.href} variant="light">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="outlineLight">
            {hero.secondaryCta.label}
          </Button>
        </div>

        <ul className={styles.meta} aria-label="Our locations">
          {siteInfo.locations.map((place) => (
            <li key={place.city}>
              {place.city}, {place.area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero