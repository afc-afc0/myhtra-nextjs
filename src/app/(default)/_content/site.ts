// All homepage copy lives here, so the voice can switch from "I" to "we" in one place when the studio grows.
// Copy follows docs/brand/positioning-and-copy.md. Items marked CONFIRM need Ahmet's sign-off before launch (see docs/ROADMAP.md).

export const founder = {
  email: 'ahmet_fatih_cengiz@hotmail.com',
  links: [
    { href: 'mailto:ahmet_fatih_cengiz@hotmail.com', label: 'Email' },
    { href: 'https://github.com/afc-afc0', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/ahmet-fatih-cengiz', label: 'LinkedIn' }
  ],
  location: 'Toronto, Canada',
  name: 'Ahmet Cengiz',
  role: 'Founder & principal engineer'
}

export const contactHref = `mailto:${founder.email}?subject=${encodeURIComponent('New project — Myhtra Studios')}`

export const hero = {
  eyebrow: 'Myhtra Studios · Founder-led engineering studio · Toronto',
  headline: ['AI agents and cloud platforms', 'you can put in production.'],
  microcopy: 'Opens an email to Ahmet. You’ll hear back from me, not a sales team.',
  primaryCta: 'Start a project',
  secondaryCta: 'See the work',
  // CONFIRM: only show while true.
  status: 'Taking on new projects',
  sub: 'I design, build and run the whole system: web apps, Azure infrastructure as code, Kubernetes, and AI agents that ask before they act. Senior engineering since 2019, with no hand-offs.'
}

export const proof = [
  { label: 'students and faculty use a workflow app I built, across US colleges', suffix: '+', value: 100000 },
  { label: 'legacy .NET Framework apps moved to .NET 6/8 and Node.js', value: 20 },
  { label: 'Kubernetes pods scanned; 100+ critical-risk pods isolated', suffix: '+', value: 1000 },
  // CONFIRM: public use of this figure.
  { label: 'yearly licensing savings I contributed to by retiring Terraform Enterprise', prefix: '~$', suffix: '–3M', value: 2 }
]

export const services = [
  {
    key: 'ai',
    outcome:
      'Agents that turn plain-language requests into real work, like planning infrastructure or provisioning cloud resources, with a human approving every step that matters and full traces of what they did.',
    tags: ['Claude', 'Amazon Bedrock', 'Langfuse', 'Human-in-the-loop'],
    title: 'Agentic AI'
  },
  {
    key: 'web',
    outcome:
      'Fast, secure Next.js and Node.js products with sign-in done right from day one: OIDC, PKCE and token rotation, not an afterthought.',
    tags: ['Next.js', 'Node.js', '.NET', 'OIDC'],
    title: 'Web apps'
  },
  {
    key: 'cloud',
    outcome:
      'Azure environments defined in Terraform: reviewable, repeatable and Zero Trust by default, shipped through CI/CD instead of the portal.',
    tags: ['Azure', 'Terraform', 'GitHub Actions'],
    title: 'Cloud & infrastructure as code'
  },
  {
    key: 'kubernetes',
    outcome:
      'Clusters you can trust under load and under audit: Helm releases, hardened workloads and scanning that finds risky pods first.',
    tags: ['AKS', 'Helm', 'Security'],
    title: 'Kubernetes'
  }
]

export interface WorkItem {
  name: string
  kind: string
  status: string
  summary: string
  metric?: { value: string; label: string }
  stack: string[]
}

export const work: WorkItem[] = [
  {
    kind: 'Enterprise · AI',
    // CONFIRM: naming PwC Canada and the savings figure.
    metric: { label: 'yearly licensing savings contributed', value: '~$2–3M' },
    name: 'Agentic cloud platform',
    stack: ['Claude', 'Bedrock', 'Terraform', 'Azure'],
    status: 'As senior engineer at PwC Canada',
    summary:
      'Natural-language workflows that automate cloud migration and Azure resource management, gated by human approval and traced end to end in Langfuse.'
  },
  {
    kind: 'Healthcare',
    metric: { label: 'built to', value: 'HIPAA' },
    name: 'Healtify',
    stack: ['Next.js', 'Node.js', 'Azure', 'FHIR'],
    status: 'Led the team · 2025–26',
    summary:
      'A telehealth platform with Zero Trust infrastructure in Terraform, FHIR/SNOMED clinical data, AI assessments, billing and video visits.'
  },
  {
    kind: 'Enterprise · Modernization',
    metric: { label: 'apps moved · 20+ vulnerabilities fixed', value: '20' },
    name: 'Legacy modernization',
    stack: ['.NET 8', 'Node.js', 'Next.js', 'Kubernetes'],
    status: 'At Synoptek',
    summary:
      '20 legacy .NET Framework apps moved to .NET 6/8 and Node.js with a Next.js frontend, shipped by CI/CD to Azure and Kubernetes.'
  },
  {
    kind: 'Education',
    metric: { label: 'students & faculty', value: '100k+' },
    name: 'College workflow platform',
    stack: ['.NET', 'Next.js', 'Azure'],
    status: 'US colleges',
    summary: 'A forms and workflow app that students and faculty across US colleges rely on every day.'
  },
  {
    kind: 'Studio product · Identity',
    name: 'DreamAuth',
    stack: ['Go', 'OIDC', 'Terraform', 'OpenTelemetry'],
    status: 'In development',
    summary:
      'A multi-tenant auth server in Go that keeps each tenant’s data in the region it must live in, with SDKs and a Terraform provider.'
  },
  {
    kind: 'Studio lab',
    name: 'DailyFlow & Book',
    stack: ['Agents', 'Claude Code', 'Python'],
    status: 'In development',
    summary:
      'DailyFlow, a developer day planner whose desktop agent asks before it acts — and Book, an AI-assisted writing studio where every line is approved by hand.'
  }
]

export const process = [
  { text: 'A short call about the problem, the constraints and what “done” looks like.', title: 'Talk' },
  { text: 'A written plan with scope, architecture, milestones and cost — before you commit to the build.', title: 'Plan' },
  { text: 'Working increments you can click every week, not a reveal at the end.', title: 'Build' },
  { text: 'Deployed, monitored and documented in your own accounts. I can stay on to run it.', title: 'Run' }
]

export const track = [
  { end: 2022.25, name: 'Deop', role: 'Microservices, Kubernetes, identity', start: 2019.25 },
  { end: 2025.83, name: 'Synoptek', role: '20 apps modernized, AI-powered CRM', start: 2022.25 },
  { end: 2026.08, name: 'Healtify', role: 'Led the team, telehealth platform', start: 2025.83 },
  { end: 2026.8, name: 'PwC Canada', role: 'Agentic AI cloud platform', start: 2026.08 }
]

export const studio = {
  comingSoon: 'New members join soon — engineers who hold the same bar.',
  headline: 'Founder-led today. Built to grow.',
  joinCta: 'Want to build with us?',
  joinText: 'Engineers who care about craft — say hello →',
  text: 'Today you work directly with me, Ahmet, from first call to production. Myhtra is adding a small number of engineers who hold the same standard.'
}

export const closing = {
  cta: 'Start a project',
  headline: 'Have a system that has to work in production?',
  sub: 'Tell me what you’re building and what’s in the way. I read and answer every message myself.'
}

export const motto = 'Pursuing perfection, project by project.'
