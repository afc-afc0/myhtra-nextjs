import styles from './Section.module.css'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  children: React.ReactNode
}

export const Section = ({ id, eyebrow, title, intro, children }: SectionProps) => {
  return (
    <section id={id} className={styles.section}>
      {(eyebrow || title) && (
        <header className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {title && <h2 className={styles.title}>{title}</h2>}
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
