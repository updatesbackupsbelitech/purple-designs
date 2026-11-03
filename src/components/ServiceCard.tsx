import { useState } from 'react'
import type { Service } from '../data/services'
import { cloudinaryImage } from '../utils/cloudinary'
import Picture from './Picture'
import styles from './ServiceCard.module.css'

// The upload size. Every service image uses this same shape (3:2).
const IMAGE = { width: 1200, height: 800 }

interface ServiceCardProps {
  service: Service
  headingLevel?: 'h3' | 'h4' // keeps the page's heading order correct
}

function ServiceCard({ service, headingLevel = 'h3' }: ServiceCardProps) {
  const [open, setOpen] = useState(false)
  const Heading = headingLevel
  const panelId = `service-${service.id}-more`

  return (
    <article className={styles.card}>
      <Picture
        flat
        src={service.imageId ? cloudinaryImage(service.imageId) : ''}
        alt={service.imageAlt}
        width={IMAGE.width}
        height={IMAGE.height}
        placeholderLabel={service.title}
        placeholderFile={`Upload as: service-${service.id}`}
      />

      <div className={styles.body}>
        <div className={styles.content}>
          <Heading className={styles.title}>{service.title}</Heading>
          <p>{service.intro}</p>

          {service.more && (
            <div id={panelId} className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
              <div className={styles.panelInner}>
                <p>{service.more}</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {service.more && (
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((isOpen) => !isOpen)}
            >
              {open ? 'Read less' : 'Read more'}
              <span className="visually-hidden"> about {service.title}</span>
              <svg
                className={styles.chevron}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <a href="#contact" className={styles.enquire}>
            Enquire<span className="visually-hidden"> about {service.title}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard