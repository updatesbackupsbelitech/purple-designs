import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import { coreServices, extraServices, servicesSection } from '../data/services'
import styles from './Services.module.css'

function Services() {
  return (
    <Section
      id="services"
      eyebrow={servicesSection.eyebrow}
      title={servicesSection.title}
      tone="beige"
    >
      <ul className={`${styles.grid} ${styles.core}`}>
        {coreServices.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>

      <h3 className={styles.groupTitle}>{servicesSection.extraTitle}</h3>

      <ul className={`${styles.grid} ${styles.extra}`}>
        {extraServices.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} headingLevel="h4" />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Services