import Button from '../components/Button'
import Picture from '../components/Picture'
import Section from '../components/Section'
import { about } from '../data/about'
import { siteInfo } from '../data/siteInfo'
import styles from './About.module.css'

function About() {
  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.title} tone="white">
      {/* ---------- Photo + company text ---------- */}
      <div className={styles.intro}>
        <div className={styles.media}>
          <Picture
            {...about.image}
            placeholderLabel="About photo"
            placeholderFile="public/images/about.webp"
          />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{about.stat.value}</span>
            <span className={styles.statLabel}>{about.stat.label}</span>
          </div>
        </div>

        <div className={styles.text}>
          <p className={styles.lead}>{about.intro}</p>

          <div className={styles.founder}>
            <p className={styles.founderLabel}>{siteInfo.founder.name} · Founder</p>
            {about.founderParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.actions}>
            <Button href={about.primaryCta.href}>{about.primaryCta.label}</Button>
            <Button href={about.secondaryCta.href} variant="outline">
              {about.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- Vision and Mission ---------- */}
      <div className={styles.statements}>
        <article className={`${styles.statement} ${styles.vision}`}>
          <h3>{about.vision.title}</h3>
          <p>{about.vision.text}</p>
        </article>
        <article className={`${styles.statement} ${styles.mission}`}>
          <h3>{about.mission.title}</h3>
          <p>{about.mission.text}</p>
        </article>
      </div>

      {/* ---------- Core values ---------- */}
      <div className={styles.values}>
        <h3 className={styles.valuesTitle}>{about.valuesTitle}</h3>
        <ul className={styles.valueList}>
          {about.values.map((value, index) => (
            <li key={value.title} className={styles.value}>
              <span className={styles.valueNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className={styles.valueTitle}>{value.title}</h4>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default About