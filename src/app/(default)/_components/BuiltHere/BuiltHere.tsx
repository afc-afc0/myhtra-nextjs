import { Section } from '../Section/Section'
import { LiveStatus } from './LiveStatus'

import styles from './BuiltHere.module.css'

const nodes = [
  { id: 'browser', label: 'You', sub: 'browser', x: 10, y: 60 },
  { id: 'ingress', label: 'Ingress', sub: 'AKS · TLS', x: 165, y: 60 },
  { hot: true, id: 'next', label: 'Next.js 16', sub: 'Helm release', x: 320, y: 60 },
  { id: 'api', label: 'API', sub: 'posts & data', x: 475, y: 12 },
  { id: 'auth', label: 'Keycloak', sub: 'OIDC sign-in', x: 475, y: 108 }
]
const edges = [
  ['browser', 'ingress'],
  ['ingress', 'next'],
  ['next', 'api'],
  ['next', 'auth']
]
const NW = 130
const NH = 52

const Diagram = () => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  return (
    <svg
      className={styles.arch}
      viewBox="0 0 615 172"
      role="img"
      aria-label="You reach an ingress on Azure Kubernetes Service, which routes to the Next.js app; it calls the API and Keycloak for sign-in."
    >
      {edges.map(([a, b]) => {
        const from = byId[a]
        const to = byId[b]
        const x1 = from.x + NW
        const y1 = from.y + NH / 2
        const x2 = to.x
        const y2 = to.y + NH / 2
        const mx = (x1 + x2) / 2
        return <path key={a + b} className={styles.edge} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} />
      })}
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x},${n.y})`}>
          <rect width={NW} height={NH} rx={10} className={n.hot ? styles.nodeHot : styles.node} />
          <text x={NW / 2} y={22} className={styles.nodeLabel}>
            {n.label}
          </text>
          <text x={NW / 2} y={39} className={styles.nodeSub}>
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  )
}

export const BuiltHere = () => {
  return (
    <Section
      id="built-here"
      eyebrow="Proof, not promises"
      title="This site runs on infrastructure I built."
      intro="Next.js on Azure Kubernetes Service, deployed with Helm, signed in through Keycloak. The numbers below are live from this server."
    >
      <div className={styles.grid}>
        <div className={styles.panel}>
          <Diagram />
        </div>
        <div className={styles.panel}>
          <LiveStatus />
        </div>
      </div>
    </Section>
  )
}
