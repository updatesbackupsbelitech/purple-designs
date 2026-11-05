import { whatsappUrl } from '../utils/whatsapp'
import Icon from './Icon'
import styles from './WhatsAppButton.module.css'

function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat on WhatsApp (opens in a new tab)"
    >
      <span className={styles.icon}>
        <Icon name="whatsapp" size={30} />
      </span>
      <span className={styles.label} aria-hidden="true">
        Chat on WhatsApp
      </span>
    </a>
  )
}

export default WhatsAppButton