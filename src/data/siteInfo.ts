export interface SocialLink {
  name: string
  url: string
}

export const siteInfo = {
  name: 'Purple Designs Ltd.',
  tagline: 'Where Modern Living Begins',
  website: 'www.purpledesignsltd.com',
  email: 'info@purpledesignsltd.com',
  phone: '+233-XX-XXX-XXXX', // PLACEHOLDER: replace with the real number
  locationLine: 'Accra Lapaz & Takoradi, Queen of Peace, Ghana',
  locations: [
    { city: 'Accra', area: 'Lapaz' },
    { city: 'Takoradi', area: 'Queen of Peace' },
  ],
  foundedYear: 2019,
  founder: { name: 'Shinelle Monroe', yearsExperience: 8 },
  // PLACEHOLDER URLs built from the handle @purpledesigngh. Open each one to confirm it works.
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/purpledesigngh' },
    { name: 'Facebook', url: 'https://www.facebook.com/purpledesigngh' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@purpledesigngh' },
  ] as SocialLink[],
}