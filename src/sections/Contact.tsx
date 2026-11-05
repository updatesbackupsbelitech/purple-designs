import ContactForm from '../components/ContactForm'
import Icon from '../components/Icon'
import LocationMap from '../components/LocationMap'
import Section from '../components/Section'
import { contactSection } from '../data/contact'
import { siteInfo } from '../data/siteInfo'
import { whatsappUrl } from '../utils/whatsapp'
import styles from './Contact.module.css'

// A real phone number becomes a tap-to-call link. The placeholder stays plain text.
const phoneIsReal = !/x/i.test(siteInfo.phone)
const phoneLink = `tel:${siteInfo.phone.replace(/[^\d+]/g, '')}`

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow={contactSection.eyebrow}
      title={contactSection.title}
      tone="beige"
    >
      <p className={styles.intro}>{contactSection.intro}</p>

      <div className={styles.layout}>
        {/* ---------- Contact details ---------- */}
        <ul className={styles.info}>
          <li className={styles.card}>
            <span className={styles.iconWrap}>
              <Icon name="mail" />
            </span>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Email</h3>
              <a href={`mailto:${siteInfo.email}`} className={styles.link}>
                {siteInfo.email}
              </a>
            </div>
          </li>

          <li className={styles.card}>
            <span className={styles.iconWrap}>
              <Icon name="phone" />
            </span>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Phone</h3>
              {phoneIsReal ? (
                <a href={phoneLink} className={styles.link}>
                  {siteInfo.phone}
                </a>
              ) : (
                <p>{siteInfo.phone}</p>
              )}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Chat on WhatsApp
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </li>

          <li className={styles.card}>
            <span className={styles.iconWrap}>
              <Icon name="pin" />
            </span>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Our offices</h3>
              {siteInfo.locations.map((place) => (
                <p key={place.city}>
                  {place.city}, {place.area}
                </p>
              ))}
            </div>
          </li>

          <li className={styles.card}>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Follow us</h3>
              <ul className={styles.socials}>
                {siteInfo.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.chip}
                    >
                      {social.name}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        {/* ---------- Form ---------- */}
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>{contactSection.formTitle}</h3>
          <ContactForm />
        </div>
      </div>

      {/* ---------- Large map, right after the form ---------- */}
      <LocationMap />
    </Section>
  )
}

export default Contact