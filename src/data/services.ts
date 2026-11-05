export interface Service {
  id: string // used in file names and HTML ids: lowercase, with hyphens
  title: string
  intro: string // always visible
  more?: string // the rest of the text, shown after "Read more" (optional)
  imageId: string // Cloudinary public ID. Leave '' to show the placeholder.
  imageAlt: string // describes the real photo, for screen readers
}

export const servicesSection = {
  eyebrow: 'What We Do',
  title: 'Our Services',
  extraTitle: 'More Services',
}

// ---------- Core services: your exact text, split after the first sentence ----------
export const coreServices: Service[] = [
  {
    id: 'architecture-drawings',
    title: 'Architecture Drawings',
    intro:
      'Our team of experienced architects specializes in creating precise and detailed architectural drawings that serve as the foundation for any construction project.',
    more: 'From conceptual sketches to final construction plans, we employ the latest tools and technologies, including AutoCAD, to develop comprehensive drawings that capture the vision, functionality, and aesthetic of each design. Whether it’s residential, commercial, or institutional projects, we ensure that every detail is meticulously documented to facilitate smooth execution and compliance with regulatory requirements.',
    imageId: 'Purple_Designs_GH_Architecture_Showcase_z75coq', // PLACEHOLDER: paste the Cloudinary public ID here
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    intro:
      'Our interior design services are tailored to enhance the functionality, comfort, and aesthetics of interior spaces, transforming them into inviting and inspiring environments.',
    more: 'Through a collaborative process, we work closely with clients to understand their needs, preferences, and aspirations, translating their vision into innovative design concepts that reflect their personality and lifestyle. From space planning and furniture selection to color schemes and lighting design, we create cohesive and harmonious interiors that optimize space, maximize functionality, and evoke emotion.',
    imageId: 'Purple_Designs_GH_Interior_Showcase_lkb0gj.png', // PLACEHOLDER
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
  {
    id: 'construction',
    title: 'Construction',
    intro:
      'As a full-service design firm, Purple Designs Ltd. offers comprehensive construction services to bring architectural visions to life.',
    more: 'With a focus on quality craftsmanship, attention to detail, and adherence to timelines and budgets, we manage every aspect of the construction process, from site preparation and foundation work to structural framing and finishing touches. Our experienced construction team collaborates closely with architects, engineers, and subcontractors to ensure seamless coordination and superior execution, delivering projects that exceed expectations and stand the test of time.',
    imageId: 'Purple_Designs_GH_Construction_Banner_czybfr.png', // PLACEHOLDER
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
]

// ---------- More services ----------
// DRAFT TEXT: written by the tutor, NOT supplied by you. Confirm or replace each
// sentence. Do not add prices, delivery areas or stock claims unless they are true.
export const extraServices: Service[] = [
  {
    id: 'building-materials-sand',
    title: 'Building Materials & Sand',
    intro:
      'Supply of building materials and sand for your construction project. Contact us to ask about what is available.', // DRAFT
    imageId: 'Purple_Designs_GH_Building_Materials_Ad.png', // PLACEHOLDER
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
  {
    id: '3d-animation',
    title: '3D Animation',
    intro: 'Realistic 3D views and animations that let you see your design before it is built.', // DRAFT (from your old site)
    imageId: 'Purple_Designs_GH_3D_Animation_Showcase.png', // PLACEHOLDER
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
  {
    id: 'house-planning',
    title: 'House Planning',
    intro: 'Planning the layout of your home so that every room and space works for the way you live.', // DRAFT (from your old site)
    imageId: 'Modern_House_Planning_in_Purple_and_Gold.png', // PLACEHOLDER
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
  {
    id: 'renovation',
    title: 'Renovation',
    intro: 'Renovation of existing homes and buildings, giving them a fresh and functional new look.', // DRAFT (from your old site)
    imageId: '', // PLACEHOLDER
    imageAlt: 'PLACEHOLDER: describe the real photo for this service.',
  },
]