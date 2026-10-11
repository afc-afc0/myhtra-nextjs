'use client'

// PROTOTYPE — throwaway. Shared copy + data for the homepage UI variants (see page.tsx).

import { useQuery } from '@tanstack/react-query'

// Personal brand: the site is Ahmet first; "Myhtra Studios" is the label until more people join.
export const brand = {
  headline: 'I build software that just works.',
  intro:
    'I’m Ahmet — a senior software developer in Toronto. I build web apps, cloud infrastructure and agentic AI platforms, from the foundations to the interface, with nothing unnecessary in between.',
  label: 'Myhtra Studios',
  motto: 'Pursuing perfection, project by project.'
}

export const services = [
  {
    key: 'web',
    short: 'Fast, minimal web apps with reliable back-ends.',
    text: 'I build scalable web apps with Next.js, Node.js and .NET — clean interfaces on top of secure, well-tested APIs.',
    title: 'Web'
  },
  {
    key: 'cloud',
    short: 'Azure infrastructure as code, done securely.',
    text: 'I design and run cloud infrastructure as code with Terraform — Zero Trust networking, private endpoints and passwordless CI/CD.',
    title: 'Cloud'
  },
  {
    key: 'kubernetes',
    short: 'Clusters that scale and stay secure.',
    text: 'I deploy and secure Kubernetes workloads with Helm, and built a scanner that found and isolated 100+ critical-risk pods.',
    title: 'Kubernetes'
  },
  {
    key: 'ai',
    short: 'LLM agents with a human in the loop.',
    text: 'I build agentic AI platforms on Claude — natural-language workflows that plan real infrastructure changes, gated by human approval.',
    title: 'Agentic AI'
  }
]

export const experience = [
  {
    company: 'PwC Canada',
    dates: '2026 – now',
    summary: 'Agentic AI platform automating cloud migration and Azure resource management.',
    title: 'Senior Software Developer'
  },
  {
    company: 'Synoptek',
    dates: '2022 – 2025',
    summary: 'Moved 20 legacy .NET apps to .NET 8, Node.js and Next.js; shipped an AI-powered CRM.',
    title: 'Developer II–III'
  },
  {
    company: 'Deop Inc.',
    dates: '2019 – 2022',
    summary: 'Java and Node.js microservices on Kubernetes; Keycloak with MFA and OIDC.',
    title: 'Developer I–II'
  }
]

export const projects = [
  {
    name: 'DreamAuth',
    status: 'Ongoing',
    summary: 'Multi-tenant authentication server in Go that keeps user data in the region the law requires.'
  },
  {
    name: 'DailyFlow',
    status: 'Ongoing',
    summary: 'A day planner for developers that does the bookkeeping for you, and asks before it acts.'
  },
  {
    name: 'Book',
    status: 'Ongoing',
    summary: 'An AI-assisted writing studio for my first novel, a grounded revenge thriller.'
  },
  {
    name: 'Healtify',
    status: '2025 – 2026',
    summary: 'Led the team building a HIPAA-compliant telehealth platform on Azure.'
  }
]

export const profile = {
  bio: 'Senior developer with 7+ years of experience building secure web APIs, cloud infrastructure and agentic AI platforms. Proven ability to ship scalable, well-tested apps used by 100,000+ users.',
  links: [
    { href: 'mailto:ahmet_fatih_cengiz@hotmail.com', label: 'Email' },
    { href: 'http://www.github.com/afc-afc0', label: 'GitHub' },
    { href: 'http://www.linkedin.com/in/ahmet-fatih-cengiz', label: 'LinkedIn' }
  ],
  location: 'Toronto, ON',
  name: 'Ahmet Cengiz',
  role: 'Senior Software Developer',
  stats: [
    { label: 'years building', value: '7+' },
    { label: 'users served', value: '100k+' },
    { label: 'pods secured', value: '1000+' }
  ]
}

export interface PrototypePost {
  id: string | number
  name: string
  userDisplayName: string
  createdAtUtc: string
}

// Used only when the real API returns nothing (e.g. running locally without the backend).
const samplePosts: PrototypePost[] = [
  { createdAtUtc: '2026-09-28T10:00:00Z', id: 's1', name: 'Deploying Next.js 16 on AKS with Helm', userDisplayName: 'Ahmet Cengiz' },
  { createdAtUtc: '2026-08-14T10:00:00Z', id: 's2', name: 'Scanning 1000 pods for vulnerabilities', userDisplayName: 'Ahmet Cengiz' },
  { createdAtUtc: '2026-07-02T10:00:00Z', id: 's3', name: 'OIDC with Keycloak and NextAuth, end to end', userDisplayName: 'Ahmet Cengiz' },
  { createdAtUtc: '2026-05-19T10:00:00Z', id: 's4', name: 'Building a rich text editor with Lexical', userDisplayName: 'Ahmet Cengiz' }
]

export const usePrototypePosts = (): PrototypePost[] => {
  const { data } = useQuery({
    queryFn: async () => {
      const response = await fetch('/api/post')
      if (!response.ok) return []
      return (await response.json()) ?? []
    },
    queryKey: ['posts']
  })
  return Array.isArray(data) && data.length > 0 ? data : samplePosts
}

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' })
