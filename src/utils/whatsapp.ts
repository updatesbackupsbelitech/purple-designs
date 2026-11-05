import { siteInfo } from '../data/siteInfo'

// Builds the link that opens WhatsApp with the message already typed
export function whatsappUrl(): string {
  return `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(siteInfo.whatsappMessage)}`
}