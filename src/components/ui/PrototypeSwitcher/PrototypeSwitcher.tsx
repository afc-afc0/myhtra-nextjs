'use client'

// PROTOTYPE — floating bar for flipping between UI variants via ?variant=. Never renders in production.

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import styles from './PrototypeSwitcher.module.css'

interface PrototypeSwitcherProps {
  variants: { key: string; name: string }[]
  current: string
}

export const PrototypeSwitcher = ({ variants, current }: PrototypeSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current)
  )

  const go = (step: number) => {
    const next = variants[(index + step + variants.length) % variants.length]
    router.replace(`${pathname}?variant=${next.key}`, { scroll: false })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className={styles.bar}>
      <button className={styles.arrow} onClick={() => go(-1)} aria-label="Previous variant">
        ←
      </button>
      <span className={styles.label}>
        <strong>{variants[index].key}</strong> {variants[index].name}
        <span className={styles.count}>
          {index + 1}/{variants.length}
        </span>
      </span>
      <button className={styles.arrow} onClick={() => go(1)} aria-label="Next variant">
        →
      </button>
    </div>
  )
}
