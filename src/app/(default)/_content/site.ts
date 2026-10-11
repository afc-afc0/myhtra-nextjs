// All homepage copy lives here, so the voice can switch from "I" to "we" in one place when the studio grows.
// Copy follows docs/brand/positioning-and-copy.md. Items marked CONFIRM need Ahmet's sign-off before launch (see docs/ROADMAP.md).

export const founder = {
  email: 'ahmet_fatih_cengiz@hotmail.com',
  links: [
    { href: 'https://github.com/afc-afc0', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/ahmet-fatih-cengiz', label: 'LinkedIn' }
  ],
  location: 'Toronto',
  name: 'Ahmet Cengiz',
  role: 'Founder & principal engineer'
}

export const contactHref = `mailto:${founder.email}?subject=${encodeURIComponent('New project — Myhtra Studios')}`

export const hero = {
  eyebrow: 'Myhtra Studios · Toronto',
  headline: ['AI agents and cloud platforms', 'you can put in production.'],
  primaryCta: 'Start a project',
  secondaryCta: 'See the work',
  sub: 'I design, build and run the whole system — web apps, Azure, Kubernetes and AI agents that ask before they act. No hand-offs.'
}

export const proof = [
  { label: 'people use an app I built', suffix: '+', value: 100000 },
  { label: 'legacy apps modernized', value: 20 },
  { label: 'Kubernetes pods secured', suffix: '+', value: 1000 },
  // CONFIRM: public use of this figure.
  { label: 'yearly savings contributed', prefix: '~$', suffix: '–3M', value: 2 }
]

export const services = [
  { key: 'ai', text: 'Agents that do real work, with a human approving every step that matters.', title: 'Agentic AI' },
  { key: 'web', text: 'Fast, secure Next.js and Node.js products, sign-in done right.', title: 'Web apps' },
  { key: 'cloud', text: 'Azure in Terraform — repeatable, reviewable, Zero Trust by default.', title: 'Cloud' },
  { key: 'kubernetes', text: 'Clusters that hold up under load and under audit.', title: 'Kubernetes' }
]

export interface WorkItem {
  name: string
  kind: string
  summary: string
  metric?: string
}

export const work: WorkItem[] = [
  {
    // CONFIRM: naming PwC Canada and the savings figure.
    kind: 'At PwC Canada',
    metric: '~$2–3M yearly savings',
    name: 'Agentic cloud platform',
    summary: 'Plain-language workflows that plan and apply Azure changes, gated by human approval.'
  },
  {
    kind: 'Healthcare · led the team',
    metric: 'Built to HIPAA requirements',
    name: 'Healtify',
    summary: 'A telehealth platform with Zero Trust infrastructure, clinical data, billing and video visits.'
  },
  {
    kind: 'Enterprise',
    metric: '20 apps · 20+ vulnerabilities fixed',
    name: 'Legacy modernization',
    summary: '.NET Framework apps moved to .NET 8 and Node.js, shipped to Azure and Kubernetes.'
  },
  {
    kind: 'Studio product',
    metric: 'In development',
    name: 'DreamAuth',
    summary: 'A multi-tenant auth server in Go that keeps each tenant’s data in the region it must live in.'
  }
]

export const closing = {
  cta: 'Start a project',
  headline: 'Have something that has to work in production?',
  studio: 'Founder-led today, new members joining soon.',
  sub: 'Tell me what you’re building. I read and answer every message myself.'
}

export const motto = 'Pursuing perfection, project by project.'
