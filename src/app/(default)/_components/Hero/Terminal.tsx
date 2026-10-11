'use client'

import { useEffect, useState } from 'react'

import styles from './Hero.module.css'

const script = [
  { cmd: 'whoami', out: 'ahmet — founder, Myhtra Studios' },
  { cmd: 'kubectl get pods -n myhtra', out: 'myhtra-web   1/1   Running   ✓' },
  { cmd: 'terraform plan', out: 'No changes. Infrastructure matches the configuration.' },
  { cmd: 'agent run --approve-first migrate', out: '12 steps planned · waiting for your approval' },
  { cmd: 'echo $MOTTO', out: 'pursuing perfection, project by project.' }
]

export const Terminal = () => {
  const [step, setStep] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setStep(script.length), 0)
      return () => clearTimeout(t)
    }
    if (step >= script.length) {
      const t = setTimeout(() => (setStep(0), setChars(0)), 5000)
      return () => clearTimeout(t)
    }
    const cmd = script[step].cmd
    const t = chars < cmd.length ? setTimeout(() => setChars(chars + 1), 50) : setTimeout(() => (setStep(step + 1), setChars(0)), 650)
    return () => clearTimeout(t)
  }, [step, chars])

  return (
    <div className={styles.terminal} aria-hidden>
      <div className={styles.termBar}>
        <span />
        <span />
        <span />
        <p>~/myhtra</p>
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
