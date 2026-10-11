'use client'

import { useEffect, useRef, useState } from 'react'
import { proof } from '../../_content/site'

import styles from './ProofBar.module.css'

const useCountUp = (value: number, run: boolean) => {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setN(value))
      return () => cancelAnimationFrame(raf)
    }
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, value])
  return n
}

const Stat = ({ value, prefix = '', suffix = '', label, run }: (typeof proof)[number] & { run: boolean }) => {
  const n = useCountUp(value, run)
  return (
    <div className={styles.stat}>
      <span className={styles.value}>
        {prefix}
        {n.toLocaleString('en-CA')}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export const ProofBar = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div className={styles.wrap}>
      <div ref={ref} className={styles.bar} aria-label="Track record in numbers">
        {proof.map((p) => (
          <Stat key={p.label} {...p} run={run} />
        ))}
      </div>
    </div>
  )
}
