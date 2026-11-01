import { siteInfo } from './siteInfo'

export type HeroVariant = 'blueprint' | 'photo'

export const hero = {
  // Change to 'photo' to use the photo background (see "Option A" below)
  variant: 'blueprint' as HeroVariant,
  // Used only when variant is 'photo'. The file must exist in public/images/
  image: '/images/hero.webp',
  eyebrow: 'Architecture · Interior Design · Construction',
  title: siteInfo.tagline,
  text: 'Architecture drawings, interior design and construction in Accra Lapaz and Takoradi, Ghana.',
  primaryCta: { label: 'Our Services', href: '#services' },
  secondaryCta: { label: 'Contact Us', href: '#contact' },
}