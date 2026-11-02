import { siteInfo } from './siteInfo'

export interface CoreValue {
  title: string
  text: string
}

export const about = {
  eyebrow: 'About Us',
  title: 'Get to know more about us',

  // PLACEHOLDER photo. To use a real one, set src to '/images/about.webp'
  // after saving the file in public/images/.
  image: {
    src: '',
    alt: 'PLACEHOLDER: describe the real photo here, for example "A bright living room designed by Purple Designs Ltd."',
    width: 1200,
    height: 1500,
  },

  // Your brief's About Us text, exactly
  intro:
    'Purple Designs Ltd. is a dynamic design firm located in Accra Lapaz and Takoradi, Ghana, nestled in the heart of Queen of Peace. Established with a passion for creativity and a commitment to excellence, we specialize in a wide array of design services, including AutoCAD, architectural designs, and drawings. With a team of highly skilled professionals, we bring innovative solutions to every project, blending functionality with aesthetics to exceed our clients’ expectations.',

  // From your old about.php (name changed from "GH" to "Ltd.")
  founderParagraphs: [
    `Founded and led by ${siteInfo.founder.name}, a highly skilled designer with over ${siteInfo.founder.yearsExperience} years of professional experience, the company has earned a reputation for delivering elegant, functional, and modern design solutions that elevate both residential and commercial spaces.`,
    'Under Shinelle’s leadership, Purple Designs Ltd. brings together creativity, precision, and deep industry expertise. Her background in interior design, architectural drafting, and space planning forms the backbone of the company’s ability to deliver stunning transformations with impeccable attention to detail.',
  ],

  stat: {
    value: siteInfo.founder.yearsExperience,
    label: 'Years of Working Experience',
  },

  primaryCta: { label: 'Our Services', href: '#services' },
  secondaryCta: { label: 'Contact Us', href: '#contact' },

  vision: {
    title: 'Our Vision',
    text: 'At Purple Designs Ltd., our vision is to become the leading design firm in Ghana, recognized for our creativity, reliability, and commitment to excellence. We aspire to set new standards in design innovation while fostering sustainable growth and development in our community.',
  },

  mission: {
    title: 'Our Mission',
    text: 'Our mission is to provide innovative design solutions that inspire, transform, and enhance the lives of our clients and communities. Through collaborative partnerships, attention to detail, and a dedication to quality, we aim to exceed our clients’ expectations and deliver projects that stand the test of time.',
  },

  valuesTitle: 'Our Core Values',
  values: [
    {
      title: 'Creativity',
      text: 'We embrace creativity as the cornerstone of our design process, constantly pushing boundaries and exploring new ideas to deliver unique and impactful solutions.',
    },
    {
      title: 'Integrity',
      text: 'We conduct our business with honesty, transparency, and professionalism, building trust and confidence with our clients, partners, and stakeholders.',
    },
    {
      title: 'Excellence',
      text: 'We strive for excellence in everything we do, from the quality of our designs to the level of service we provide, ensuring that each project is completed to the highest standards.',
    },
    {
      title: 'Collaboration',
      text: 'We believe in the power of collaboration, working closely with clients, partners, and communities to achieve shared goals and create meaningful impact.',
    },
    {
      title: 'Sustainability',
      text: 'We are committed to sustainable design practices that minimize environmental impact and promote the long-term well-being of our planet and future generations.',
    },
  ] as CoreValue[],
}