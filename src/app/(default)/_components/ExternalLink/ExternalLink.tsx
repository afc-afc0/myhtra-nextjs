import Link from 'next/link'

import styles from './ExternalLink.module.css'

// Opens in a new tab. `tapTarget` is for standalone links (not inline in a sentence).
export const ExternalLink = ({ href, tapTarget = false, children }: { href: string; tapTarget?: boolean; children: React.ReactNode }) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={tapTarget ? styles.tapTarget : undefined}>
      {children}
    </Link>
  )
}
