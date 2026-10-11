'use client'

// PROTOTYPE — Variant D "Widget gallery": every add-on widget, numbered, so we can pick which ones go into the winning layout.

import {
  ActivityHeatmap,
  ArchitectureDiagram,
  CareerTimeline,
  ImpactCounters,
  LiveStatus,
  SkillBars,
  TerminalIntro,
  TimeSplit
} from './widgets/Widgets'

import styles from './VariantD.module.css'

export const variantDName = 'Widget gallery'

const widgets = [
  { data: 'Real numbers', effort: 'S', el: <ImpactCounters />, title: 'Impact counters', why: 'Numbers count up as you scroll in.' },
  { data: 'Real dates', effort: 'S', el: <CareerTimeline />, title: 'Career timeline', why: '7 years at a glance; hover a bar.' },
  { data: 'Placeholder', effort: 'S', el: <SkillBars />, title: 'Skills chart', why: 'Years per technology, bars grow in.' },
  { data: 'Placeholder', effort: 'S', el: <TimeSplit />, title: 'Where my time goes', why: 'One bar, four slices of focus.' },
  { data: 'Sample → GitHub', effort: 'M', el: <ActivityHeatmap />, title: 'Activity heatmap', why: 'GitHub-style year of work.' },
  { data: 'Simulated → AKS', effort: 'M', el: <LiveStatus />, title: 'Live site status', why: 'This site’s own health, live.' },
  { data: 'Static', effort: 'S', el: <TerminalIntro />, title: 'Terminal intro', why: 'Typed commands; great hero side-piece.' },
  { data: 'Static', effort: 'S', el: <ArchitectureDiagram />, title: 'How this site runs', why: 'Animated flow of the real stack.' }
]

export const VariantD = () => (
  <main className={styles.page}>
    <header className={styles.header}>
      <h1>Pick the extras</h1>
      <p>Each one drops into any layout (A, B or C). Tell us the numbers you want, e.g. “B with 1, 2, 6”.</p>
    </header>
    <div className={styles.grid}>
      {widgets.map((w, i) => (
        <section key={w.title} className={`${styles.card} ${i === 4 || i === 7 ? styles.wide : ''}`}>
          <div className={styles.meta}>
            <span className={styles.badge}>#{i + 1}</span>
            <h2>{w.title}</h2>
            <span className={styles.tags}>
              <span>{w.data}</span>
              <span>Effort {w.effort}</span>
            </span>
          </div>
          <p className={styles.why}>{w.why}</p>
          <div className={styles.body}>{w.el}</div>
        </section>
      ))}
    </div>
  </main>
)
