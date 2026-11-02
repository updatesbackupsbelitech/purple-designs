import { siteInfo } from './siteInfo'

export type HeroVariant = 'blueprint' | 'photo'

export const hero = {
  // 'photo' shows the image below. Change back to 'blueprint' for the line pattern.
  variant: 'photo' as HeroVariant,
  // Your Cloudinary image. Paste a different web address here to change the photo.
  image:
    'https://res.cloudinary.com/boxny7z4/image/upload/v1793631145/purple-designs-gh-hero.webp',
  // The three lines of text on top of the photo. Edit them here.
  eyebrow: 'Architecture · Interior Design · Construction',
  title: siteInfo.tagline,
  text: 'Architecture drawings, interior design and construction in Accra Lapaz and Takoradi, Ghana.',
  primaryCta: { label: 'Our Services', href: '#services' },
  secondaryCta: { label: 'Contact Us', href: '#contact' },
}