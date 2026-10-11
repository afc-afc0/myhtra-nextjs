'use client'

// PROTOTYPE — add-on widgets for the personal homepage. Zero chart libraries: plain SVG + CSS.
// Numbers marked PLACEHOLDER are guesses to be replaced with real ones.

import { useEffect, useMemo, useRef, useState } from 'react'

import styles from './Widgets.module.css'

// ---------- shared helpers ----------

const useInView = <T extends Element>() => {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return { inView, ref }
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Deterministic PRNG so server and client render the same "random" data.
const seeded = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

interface Tip {
  x: number
  y: number
  text: string
}

const Tooltip = ({ tip }: { tip: Tip | null }) =>
  tip ? (
    <div className={styles.tooltip} style={{ left: tip.x, top: tip.y }} role="status">
      {tip.text}
    </div>
  ) : null

const tipFrom = (e: React.MouseEvent, host: HTMLElement | null, text: string): Tip | null => {
  if (!host) return null
  const r = host.getBoundingClientRect()
  return { text, x: e.clientX - r.left, y: e.clientY - r.top }
}

// ---------- 1. Impact counters ----------

const impact = [
  { label: 'users on apps I built', suffix: '+', value: 100000 },
  { label: 'Kubernetes pods scanned', suffix: '+', value: 1000 },
  { label: 'legacy apps modernized', suffix: '', value: 20 },
  { label: 'yearly savings contributed', prefix: '$', suffix: 'M+', value: 2 }
]

const CountUp = ({ value, prefix = '', suffix = '', run }: { value: number; prefix?: string; suffix?: string; run: boolean }) => {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    if (prefersReducedMotion()) {
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
  return (
    <>
      {prefix}
      {n.toLocaleString('en-CA')}
      {suffix}
    </>
  )
}

export const ImpactCounters = () => {
  const { inView, ref } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={styles.counters}>
      {impact.map((s) => (
        <div key={s.label} className={styles.counter}>
          <span className={styles.counterValue}>
            <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} run={inView} />
          </span>
          <span className={styles.counterLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ---------- 2. Career timeline (Gantt) ----------

const career = [
  { company: 'Deop Inc.', end: 2022.17, role: 'Developer I–II', start: 2019.25 },
  { company: 'Synoptek', end: 2025.83, role: 'Developer II–III', start: 2022.25 },
  { company: 'Healtify', end: 2026.08, role: 'Senior Software Developer', start: 2025.83 },
  { company: 'PwC Canada', end: 2026.78, role: 'Senior Software Developer', start: 2026.08 }
]
const Y0 = 2019
const Y1 = 2027

export const CareerTimeline = () => {
  const host = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)
  const pct = (y: number) => ((y - Y0) / (Y1 - Y0)) * 100
  const years = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i)

  return (
    <div ref={host} className={styles.gantt} onMouseLeave={() => setTip(null)}>
      {career.map((c) => (
        <div key={c.company} className={styles.ganttRow}>
          <span className={styles.ganttLabel}>{c.company}</span>
          <div className={styles.ganttTrack}>
            {years.slice(1, -1).map((y) => (
              <span key={y} className={styles.ganttGrid} style={{ left: `${pct(y)}%` }} />
            ))}
            <span
              className={styles.ganttBar}
              style={{ left: `${pct(c.start)}%`, width: `max(6px, calc(${pct(c.end) - pct(c.start)}% - 2px))` }}
              onMouseMove={(e) => setTip(tipFrom(e, host.current, `${c.role} · ${c.company} · ${(c.end - c.start).toFixed(1)} yrs`))}
            />
          </div>
        </div>
      ))}
      <div className={styles.ganttRow}>
        <span />
        <div className={styles.ganttAxis}>
          {years.map((y) => (
            <span key={y} style={{ left: `${pct(y)}%` }}>
              {y === 2027 ? '' : `’${String(y).slice(2)}`}
            </span>
          ))}
        </div>
      </div>
      <Tooltip tip={tip} />
    </div>
  )
}

// ---------- 3. Skills bar chart ----------

// PLACEHOLDER years — replace with real numbers.
const skills = [
  { name: 'Node.js / TypeScript', years: 7 },
  { name: 'Kubernetes', years: 7 },
  { name: 'Azure', years: 4.5 },
  { name: '.NET', years: 4.5 },
  { name: 'Next.js / React', years: 4.5 },
  { name: 'Java / Spring', years: 3 },
  { name: 'Terraform', years: 2 },
  { name: 'LLM agents', years: 1 }
]

export const SkillBars = () => {
  const host = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)
  const { inView, ref } = useInView<HTMLDivElement>()
  const max = 8

  return (
    <div ref={host} className={styles.bars} onMouseLeave={() => setTip(null)}>
      <div ref={ref}>
        {skills.map((s) => (
          <div key={s.name} className={styles.barRow} onMouseMove={(e) => setTip(tipFrom(e, host.current, `${s.name}: ${s.years} years`))}>
            <span className={styles.barLabel}>{s.name}</span>
            <span className={styles.barTrack}>
              <span className={styles.bar} style={{ width: inView ? `${(s.years / max) * 100}%` : 0 }} />
            </span>
            <span className={styles.barValue}>{s.years}y</span>
          </div>
        ))}
      </div>
      <Tooltip tip={tip} />
    </div>
  )
}

// ---------- 4. Where my time goes (100% stacked bar) ----------

// PLACEHOLDER split.
const split = [
  { label: 'Backend & APIs', pct: 35 },
  { label: 'Cloud & infra', pct: 30 },
  { label: 'Frontend', pct: 20 },
  { label: 'AI agents', pct: 15 }
]

export const TimeSplit = () => {
  const host = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)
  return (
    <div ref={host} className={styles.split} onMouseLeave={() => setTip(null)}>
      <div className={styles.splitBar}>
        {split.map((s, i) => (
          <span
            key={s.label}
            className={styles.splitSeg}
            style={{ background: `var(--series-${i + 1})`, flexGrow: s.pct }}
            onMouseMove={(e) => setTip(tipFrom(e, host.current, `${s.label}: ${s.pct}%`))}
          />
        ))}
      </div>
      <ul className={styles.legend}>
        {split.map((s, i) => (
          <li key={s.label}>
            <span className={styles.swatch} style={{ background: `var(--series-${i + 1})` }} />
            {s.label} <strong>{s.pct}%</strong>
          </li>
        ))}
      </ul>
      <Tooltip tip={tip} />
    </div>
  )
}

// ---------- 5. Activity heatmap ----------

const WEEKS = 52
const END = new Date('2026-10-11T12:00:00Z')

export const ActivityHeatmap = () => {
  const host = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)
  const cells = useMemo(() => {
    const rand = seeded(7)
    return Array.from({ length: WEEKS * 7 }, (_, i) => {
      const date = new Date(END.getTime() - (WEEKS * 7 - 1 - i) * 86400000)
      const weekday = date.getUTCDay()
      const r = rand()
      const busy = weekday > 0 && weekday < 6 ? 1 : 0.35
      const count = r < 0.18 ? 0 : Math.round(r * r * 12 * busy)
      return { count, date }
    })
  }, [])
  const total = cells.reduce((a, c) => a + c.count, 0)
  const level = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 5 ? 2 : n < 8 ? 3 : 4)

  return (
    <div ref={host} className={styles.heat} onMouseLeave={() => setTip(null)}>
      <p className={styles.heatTotal}>
        <strong>{total.toLocaleString('en-CA')}</strong> contributions in the last year
      </p>
      <div className={styles.heatScroll}>
        <div className={styles.heatGrid}>
          {cells.map((c, i) => (
            <span
              key={i}
              className={styles.heatCell}
              data-level={level(c.count)}
              onMouseMove={(e) =>
                setTip(
                  tipFrom(
                    e,
                    host.current,
                    `${c.count} contribution${c.count === 1 ? '' : 's'} · ${c.date.toLocaleDateString('en-CA', { day: 'numeric', month: 'short', timeZone: 'UTC' })}`
                  )
                )
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.heatLegend}>
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={styles.heatCell} data-level={l} />
        ))}
        More
      </div>
      <Tooltip tip={tip} />
    </div>
  )
}

// ---------- 6. Live status of this site ----------

const POINTS = 40

export const LiveStatus = () => {
  const host = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [series, setSeries] = useState(() => {
    const rand = seeded(3)
    return Array.from({ length: POINTS }, () => 70 + rand() * 40)
  })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setSeries((s) => {
        const last = s[s.length - 1]
        const next = Math.min(160, Math.max(55, last + (Math.random() - 0.5) * 22))
        return [...s.slice(1), next]
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const W = 320
  const H = 80
  const max = 180
  const x = (i: number) => (i / (POINTS - 1)) * W
  const y = (v: number) => H - (v / max) * H
  const line = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const current = series[series.length - 1]
  const shown = hover ?? POINTS - 1

  return (
    <div ref={host} className={styles.live}>
      <div className={styles.liveHeader}>
        <span className={styles.statusGood}>
          <span aria-hidden>●</span> All systems normal
        </span>
        <span className={styles.liveMeta}>3/3 pods ready · AKS canadacentral</span>
      </div>
      <div className={styles.liveStats}>
        <div>
          <span className={styles.liveValue}>99.98%</span>
          <span className={styles.liveLabel}>uptime · 30 days</span>
        </div>
        <div>
          <span className={styles.liveValue}>{Math.round(series[shown])} ms</span>
          <span className={styles.liveLabel}>{hover === null ? 'p95 latency · now' : `p95 · ${(POINTS - 1 - shown) * 1.5}s ago`}</span>
        </div>
      </div>
      <svg
        className={styles.spark}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setHover(Math.round(((e.clientX - r.left) / r.width) * (POINTS - 1)))
        }}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label={`p95 latency, currently ${Math.round(current)} milliseconds`}
      >
        <path d={`${line} L${W},${H} L0,${H} Z`} className={styles.sparkArea} />
        <path d={line} className={styles.sparkLine} vectorEffect="non-scaling-stroke" />
        {hover !== null && (
          <line x1={x(hover)} x2={x(hover)} y1={0} y2={H} className={styles.sparkCross} vectorEffect="non-scaling-stroke" />
        )}
      </svg>
      <p className={styles.note}>Simulated here — the real one would read from a small /api/status route on the cluster.</p>
    </div>
  )
}

// ---------- 7. Terminal intro ----------

const script = [
  { cmd: 'whoami', out: 'ahmet — senior software developer, toronto' },
  { cmd: 'kubectl get pods -n myhtra', out: 'myhtra-web-7d9f   1/1   Running   0   12d' },
  { cmd: 'terraform plan', out: 'Plan: 0 to add, 0 to change, 0 to destroy. ✓' },
  { cmd: 'echo $MOTTO', out: 'pursuing perfection, project by project.' }
]

export const TerminalIntro = () => {
  const [step, setStep] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = setTimeout(() => setStep(script.length), 0)
      return () => clearTimeout(t)
    }
    if (step >= script.length) {
      const t = setTimeout(() => (setStep(0), setChars(0)), 4000)
      return () => clearTimeout(t)
    }
    const cmd = script[step].cmd
    const t = chars < cmd.length ? setTimeout(() => setChars(chars + 1), 55) : setTimeout(() => (setStep(step + 1), setChars(0)), 700)
    return () => clearTimeout(t)
  }, [step, chars])

  return (
    <div className={styles.terminal} aria-label="Terminal animation">
      <div className={styles.termBar}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.termBody}>
        {script.slice(0, step).map((l) => (
          <div key={l.cmd}>
            <p>
              <span className={styles.prompt}>$</span> {l.cmd}
            </p>
            <p className={styles.termOut}>{l.out}</p>
          </div>
        ))}
        {step < script.length && (
          <p>
            <span className={styles.prompt}>$</span> {script[step].cmd.slice(0, chars)}
            <span className={styles.caret} />
          </p>
        )}
      </div>
    </div>
  )
}

// ---------- 8. How this site runs (architecture diagram) ----------

const nodes = [
  { id: 'browser', label: 'Browser', sub: 'you', x: 10, y: 55 },
  { id: 'ingress', label: 'Ingress', sub: 'AKS · TLS', x: 170, y: 55 },
  { hot: true, id: 'next', label: 'Next.js 16', sub: 'Helm · pods', x: 330, y: 55 },
  { id: 'api', label: 'API', sub: 'api.myhtra.co', x: 490, y: 10 },
  { id: 'auth', label: 'Keycloak', sub: 'OIDC', x: 490, y: 100 }
]
const edges = [
  ['browser', 'ingress'],
  ['ingress', 'next'],
  ['next', 'api'],
  ['next', 'auth']
]
const NW = 130
const NH = 52

export const ArchitectureDiagram = () => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  return (
    <svg
      className={styles.arch}
      viewBox="0 0 630 165"
      role="img"
      aria-label="Browser to Ingress on AKS to Next.js pods, which call the API and Keycloak"
    >
      {edges.map(([a, b]) => {
        const from = byId[a]
        const to = byId[b]
        const x1 = from.x + NW
        const y1 = from.y + NH / 2
        const x2 = to.x
        const y2 = to.y + NH / 2
        const mx = (x1 + x2) / 2
        return <path key={a + b} className={styles.archEdge} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} />
      })}
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x},${n.y})`}>
          <rect width={NW} height={NH} rx={10} className={n.hot ? styles.archNodeHot : styles.archNode} />
          <text x={NW / 2} y={22} className={styles.archLabel}>
            {n.label}
          </text>
          <text x={NW / 2} y={39} className={styles.archSub}>
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  )
}
