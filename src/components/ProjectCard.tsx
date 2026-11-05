import type { CSSProperties } from 'react'
import type { Project } from '../data/projects'
import { cloudinaryImage } from '../utils/cloudinary'
import Picture from './Picture'
import styles from './ProjectCard.module.css'

// Every card image uses this same shape (4:3).
const THUMB = { width: 800, height: 600 }

interface ProjectCardProps {
  project: Project
  index: number // position in the grid, used to stagger the entrance animation
  onOpen: () => void
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const label = `View ${project.title}, ${project.category}, ${project.location}, ${project.year}`

  return (
    <li className={styles.item} style={{ '--i': index } as CSSProperties}>
      <article className={styles.card}>
        {/* Decorative copy of the information: the button below carries the label */}
        <div className={styles.media} aria-hidden="true">
          <Picture
            flat
            src={project.imageId ? cloudinaryImage(project.imageId, THUMB.width, THUMB.height) : ''}
            alt={project.imageAlt}
            width={THUMB.width}
            height={THUMB.height}
            placeholderLabel={project.title}
            placeholderFile={`Upload as: ${project.id}`}
          />
          <span className={styles.chip}>{project.category}</span>
          <span className={styles.overlay}>
            <span className={styles.pill}>
              View project
              <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
                <path
                  d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </div>

        <div className={styles.caption}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.meta}>
            {project.location} · {project.year}
          </p>
        </div>

        {/* A button stretched over the whole card, so the entire card is clickable */}
        <button type="button" className={styles.trigger} aria-label={label} onClick={onOpen} />
      </article>
    </li>
  )
}

export default ProjectCard