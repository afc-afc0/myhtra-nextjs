'use client'

import { useEffect, useState } from 'react'

import styles from './BuiltHere.module.css'

interface Status {
  apiLatencyMs: number | null
  apiUp: boolean
  uptimeSeconds: number
}

const MAX_POINTS = 30
const INTERVAL_MS = 5000

const formatUptime = (s: number) => {
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  return d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${m}m` : `${m}m`
}

// Polls /api/status and charts the round trip this browser actually measures — real numbers only.
export const LiveStatus = () => {
  const [status, setStatus] = useState<Status | null>(null)
  const [failed, setFailed] = useState(false)
  const [samples, setSamples] = useState<number[]>([])
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const poll = async () => {
      const started = performance.now()
      try {
        const res = await fetch('/api/status', { cache: 'no-store' })
        if (!res.ok) throw new Error(String(res.status))
        const data: Status = await res.json()
        const rtt = Math.round(performance.now() - started)
        if (cancelled) return
        setStatus(data)
        setFailed(false)
        setSamples((s) => [...s.slice(-(MAX_POINTS - 1)), rtt])
      } catch {
        if (!cancelled) setFailed(true)
      }
    }
    poll()
    const id = setInterval(() => document.visibilityState === 'visible' && poll(), INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const healthy = !failed && status?.apiUp !== false
  const W = 300
  const H = 72
  const max = Math.max(100, ...samples) * 1.15
  const x = (i: number) => (samples.length < 2 ? W : (i / (samples.length - 1)) * W)
  const y = (v: number) => H - (v / max) * H
  const line = samples.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const shown = hover ?? samples.length - 1

  return (
    <div className={styles.live}>
      <div className={styles.liveHeader}>
        <span className={healthy ? styles.good : styles.bad}>
          <span aria-hidden>{healthy ? '●' : '▲'}</span> {status ? (healthy ? 'All systems normal' : 'Degraded') : 'Checking…'}
        </span>
        <span className={styles.liveMeta}>live · every 5s</span>
      </div>

      <dl className={styles.liveStats}>
        <div>
          <dt>{samples.length ? `${samples[shown]} ms` : '—'}</dt>
          <dd>{hover === null ? 'round trip from you' : `sample ${shown + 1} of ${samples.length}`}</dd>
        </div>
        <div>
          <dt>{status?.apiLatencyMs != null ? `${status.apiLatencyMs} ms` : '—'}</dt>
          <dd>site → API</dd>
        </div>
        <div>
          <dt>{status ? formatUptime(status.uptimeSeconds) : '—'}</dt>
          <dd>server uptime</dd>
        </div>
      </dl>

      <svg
        className={styles.spark}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={samples.length ? `Round-trip time, latest ${samples[samples.length - 1]} milliseconds` : 'Waiting for samples'}
        onMouseMove={(e) => {
          if (samples.length < 2) return
          const r = e.currentTarget.getBoundingClientRect()
          setHover(Math.round(((e.clientX - r.left) / r.width) * (samples.length - 1)))
        }}
        onMouseLeave={() => setHover(null)}
      >
        {samples.length > 1 && (
          <>
            <path d={`${line} L${W},${H} L0,${H} Z`} className={styles.sparkArea} />
            <path d={line} className={styles.sparkLine} vectorEffect="non-scaling-stroke" />
          </>
        )}
        {hover !== null && (
          <line x1={x(hover)} x2={x(hover)} y1={0} y2={H} className={styles.sparkCross} vectorEffect="non-scaling-stroke" />
        )}
      </svg>
    </div>
  )
}
