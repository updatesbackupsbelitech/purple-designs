export const contactSection = {
  eyebrow: 'Get In Touch',
  title: 'Contact Us',
  intro: 'Tell us about your project and we will get back to you.', // DRAFT wording
  formTitle: 'Send us a message',
  mapTitle: 'Find Us',
  mapIntro: 'Choose an office to see it on the map.', // DRAFT wording
}

export const contactForm = {
  endpoint: '/api/contact.php', // the PHP file that sends the email
  simulate: false, // true = pretend to send, to test the pop-up without PHP. Keep false when you push.
  successTitle: 'Message sent!',
  successMessage:
    'Thank you, {name}. Your message has been sent and we will get back to you shortly.',
  errorTitle: 'Message not sent',
  errorMessage: 'Something went wrong. Please try again, or contact us by email or WhatsApp.',
}

export interface MapLocation {
  id: string
  city: string
  label: string // shown on the button
  query: string // what Google Maps searches for
  embedUrl?: string // optional: an exact "Embed a map" address from Google (see section 6)
}

// To change a pin, edit its query. East Legon is used because you asked for it,
// but the text on the page says Lapaz. Change "East Legon" to "Lapaz" if that was a slip.
export const mapLocations: MapLocation[] = [
  {
    id: 'accra',
    city: 'Accra',
    label: 'East Legon',
    query: 'East Legon, Accra, Ghana',
  },
  {
    id: 'takoradi',
    city: 'Takoradi',
    label: 'Etna Hotel, Anaji',
    query: 'Etna Hotel, Anaji, Takoradi, Ghana',
  },
]