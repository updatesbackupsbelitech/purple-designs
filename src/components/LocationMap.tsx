import { useState } from 'react'
import { contactSection, mapLocations } from '../data/contact'
import Icon from './Icon'
import styles from './LocationMap.module.css'

function LocationMap() {
  const [activeId, setActiveId] = useState(mapLocations[0].id)
  const active = mapLocations.find((place) => place.id === activeId) ?? mapLocations[0]

  const query = encodeURIComponent(active.query)
  const embedSrc = active.embedUrl || `https://www.google.com/maps?q=${query}&z=16&output=embed`
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{contactSection.mapTitle}</h3>
      <p className={styles.intro}>{contactSection.mapIntro}</p>

      <div className={styles.tabs} role="group" aria-label="Choose an office to show on the map">
        {mapLocations.map((place) => {
          const selected = place.id === active.id
          return (
            <button
              key={place.id}
              type="button"
              className={`${styles.tab} ${selected ? styles.selected : ''}`}
              aria-pressed={selected}
              onClick={() => setActiveId(place.id)}
            >
              <Icon name="pin" size={18} />
              {place.city} · {place.label}
            </button>
          )
        })}
      </div>

      <div className={styles.frame}>
        {/* key makes the map reload when the office changes */}
        <iframe
          key={active.id}
          title={`Map showing ${active.label}, ${active.city}`}
          src={embedSrc}
          className={styles.map}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <p className="visually-hidden" aria-live="polite">
        Map now showing {active.label}, {active.city}
      </p>

      <div className={styles.links}>
        <a href={openUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Open in Google Maps
          <Icon name="external" size={16} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Get directions
          <Icon name="external" size={16} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}

export default LocationMap