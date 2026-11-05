// The filter buttons come from this list, so a project's category must match one of these exactly.
export const projectCategories = [
  'Architecture Drawings',
  'Interior Design',
  'Construction',
] as const

export type ProjectCategory = (typeof projectCategories)[number]
export type ProjectLocation = 'Accra' | 'Takoradi'

export interface Project {
  id: string // lowercase with hyphens, never repeated
  title: string
  location: ProjectLocation
  year: number
  category: ProjectCategory
  imageId: string // Cloudinary public ID. Leave '' to show the placeholder.
  imageAlt: string // describes the real photo, for screen readers
}

export const projectsSection = {
  eyebrow: 'Our Work',
  title: 'Projects',
  intro: 'A selection of our work. Choose a category, then select a project to see it larger.',
  allLabel: 'All',
}

// PLACEHOLDER PROJECTS: titles, years and image IDs are all samples.
// Replace each one with a real project, and set imageId to the Cloudinary public ID.
export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'Project Title 01', // PLACEHOLDER
    location: 'Accra',
    year: 2024, // PLACEHOLDER
    category: 'Interior Design',
    imageId: 'v1793868862/photo_2026-10-25_11-31-02_twqnox.jpg', // PLACEHOLDER: e.g. 'projects/project-01'
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-02',
    title: 'Project Title 02', // PLACEHOLDER
    location: 'Takoradi',
    year: 2026, // PLACEHOLDER
    category: 'Interior Design',
    imageId: 'v1793868862/photo_2026-10-25_12-20-51_xzopaj.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-03',
    title: 'Project Title 03', // PLACEHOLDER
    location: 'Accra',
    year: 2025, // PLACEHOLDER
    category: 'Construction',
    imageId: 'v1793868863/photo_2026-10-25_12-20-57_4_ypkl3e.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-04',
    title: 'Project Title 04', // PLACEHOLDER
    location: 'Takoradi',
    year: 2025, // PLACEHOLDER
    category: 'Architecture Drawings',
    imageId: 'photo_2026-10-25_12-20-51_xzopaj.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-05',
    title: 'Project Title 05', // PLACEHOLDER
    location: 'Accra',
    year: 2025, // PLACEHOLDER
    category: 'Interior Design',
    imageId: 'https://res.cloudinary.com/dpfzdm4ze/image/upload/v1793868863/photo_2026-10-25_11-34-57_2_s8tbrl.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-06',
    title: 'Project Title 06', // PLACEHOLDER
    location: 'Takoradi',
    year: 2023, // PLACEHOLDER
    category: 'Construction',
    imageId: 'https://res.cloudinary.com/dpfzdm4ze/image/upload/v1793868863/photo_2026-10-25_12-20-57_ufspiu.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-07',
    title: 'Project Title 07', // PLACEHOLDER
    location: 'Accra',
    year: 2023, // PLACEHOLDER
    category: 'Architecture Drawings',
    imageId: 'https://res.cloudinary.com/dpfzdm4ze/image/upload/v1793868864/photo_2026-10-25_12-21-00_zyharf.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-08',
    title: 'Project Title 08', // PLACEHOLDER
    location: 'Takoradi',
    year: 2026, // PLACEHOLDER
    category: 'Interior Design',
    imageId: 'https://res.cloudinary.com/dpfzdm4ze/image/upload/v1793868863/photo_2026-10-25_11-34-57_3_vllgoo.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },
  {
    id: 'project-09',
    title: 'Project Title 09', // PLACEHOLDER
    location: 'Accra',
    year: 2026, // PLACEHOLDER
    category: 'Construction',
    imageId: 'photo_2026-11-02_15-15-46_amxswf.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },

     {
    id: 'project-09',
    title: 'Project Title 09', // PLACEHOLDER
    location: 'Accra',
    year: 2026, // PLACEHOLDER
    category: 'Construction',
    imageId: 'v1793868866/photo_2026-11-02_15-15-38_u3d7gf.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },


   {
    id: 'project-09',
    title: 'Project Title 09', // PLACEHOLDER
    location: 'Accra',
    year: 2026, // PLACEHOLDER
    category: 'Construction',
    imageId: 'v1793868867/photo_2026-11-02_14-35-43_2_aqnhda.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },

{
    id: 'project-09',
    title: 'Project Title 09', // PLACEHOLDER
    location: 'Accra',
    year: 2026, // PLACEHOLDER
    category: 'Construction',
    imageId: 'photo_2026-10-25_12-20-57_2_iivzrf.jpg',
    imageAlt: 'PLACEHOLDER: describe the real photo for this project.',
  },

]