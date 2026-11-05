import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import ProjectCard from '../components/ProjectCard'
import Section from '../components/Section'
import { projectCategories, projects, projectsSection } from '../data/projects'
import type { ProjectCategory } from '../data/projects'
import styles from './Projects.module.css'

type Filter = 'All' | ProjectCategory

const filters: Filter[] = ['All', ...projectCategories]

function countFor(filter: Filter): number {
  return filter === 'All' ? projects.length : projects.filter((p) => p.category === filter).length
}

function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section
      id="projects"
      eyebrow={projectsSection.eyebrow}
      title={projectsSection.title}
      tone="white"
    >
      <p className={styles.intro}>{projectsSection.intro}</p>

      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {filters.map((item) => {
          const selected = filter === item
          return (
            <button
              key={item}
              type="button"
              className={`${styles.filter} ${selected ? styles.selected : ''}`}
              aria-pressed={selected}
              onClick={() => setFilter(item)}
            >
              {item === 'All' ? projectsSection.allLabel : item}
              <span className={styles.count}>{countFor(item)}</span>
            </button>
          )
        })}
      </div>

      {/* Announces the result of a filter change to screen readers */}
      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
        {filter === 'All' ? '' : ` in ${filter}`}
      </p>

      {visible.length === 0 ? (
        <p className={styles.empty}>No projects in this category yet.</p>
      ) : (
        // key={filter} makes React rebuild the grid, which replays the card animations
        <ul key={filter} className={styles.grid}>
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <Lightbox items={visible} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </Section>
  )
}

export default Projects