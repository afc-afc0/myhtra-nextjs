'use client'

import { useRef, useState } from 'react'
import { track } from '../../_content/site'
import { Section } from '../Section/Section'

import styles from './TrackRecord.module.css'

const Y0 = 2019
const Y1 = 2027
const years = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i)
const pct = (y: number) => ((y - Y0) / (Y1 - Y0)) * 100

export const TrackRecord = () => {
  const host = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null)

  const show = (e: React.MouseEvent, text: string) => {
    const r = host.current?.getBoundingClientRect()
    if (r) setTip({ text, x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <Section
      eyebrow="Track record"
      title="Seven years of shipping to production."
      intro="From microservices and identity to modernizing legacy fleets and building AI agents for the enterprise."
    >
      <div ref={host} className={styles.chart} onMouseLeave={() => setTip(null)}>
        {track.map((t, i) => (
          <div key={t.name} className={styles.row}>
            <span className={styles.label}>{t.name}</span>
            <div className={styles.track}>
              {years.slice(1, -1).map((y) => (
                <span key={y} className={styles.grid} style={{ left: `${pct(y)}%` }} />
              ))}
              <span
                className={`${styles.bar} ${i === track.length - 1 ? styles.current : ''}`}
                style={{ left: `${pct(t.start)}%`, width: `max(6px, calc(${pct(t.end) - pct(t.start)}% - 2px))` }}
                onMouseMove={(e) => show(e, `${t.name} · ${t.role}`)}
              />
            </div>
            <span className={styles.role}>{t.role}</span>
          </div>
        ))}
        <div className={styles.row}>
          <span />
          <div className={styles.axis}>
            {years.slice(0, -1).map((y) => (
              <span key={y} style={{ left: `${pct(y)}%` }}>
                {y}
              </span>
            ))}
          </div>
          <span />
        </div>
        {tip && (
          <div className={styles.tooltip} style={{ left: tip.x, top: tip.y }} role="status">
            {tip.text}
          </div>
        )}
      </div>
    </Section>
  )
}
