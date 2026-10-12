// Facts only, in Ahmet's own wording (from the profile card, commit d3374b7). **Bold** marks what matters most.

export const experience = [
  {
    company: 'PwC Canada',
    companyHref: 'https://www.pwc.com/ca/en.html',
    dates: 'Feb 2026 – Present · Toronto, ON',
    highlights: [
      'Building an **agentic AI platform** that automates cloud migration and Azure resource management through natural-language workflows, replacing manual Terraform Enterprise operations.',
      'Contributed to **~$2–3M in annual savings** by retiring Terraform Enterprise licensing in favour of an open-source toolchain with Azure-native state.',
      'Cut per-request LLM spend with **multi-tier caching** on Claude via Amazon Bedrock, using Langfuse traces to drive few-shot selection and prompt refinement.',
      'Shipped a **conversational Azure provisioning agent**: intent capture, Terraform plan generation, security remediation and policy advisory, gated by **human approval**.'
    ],
    title: 'Senior Software Developer'
  },
  {
    company: 'Synoptek',
    companyHref: 'https://synoptek.com/',
    dates: 'Apr 2022 – Nov 2025 · Toronto, ON',
    highlights: [
      'Directed the move of **20 legacy .NET Framework apps** to .NET 6/8 and Node.js, with a Next.js frontend and a shared React component library.',
      'Implemented **IAM patterns** (JWT lifecycle, PKCE, refresh token rotation) and CI/CD to Azure App Service, IIS and Kubernetes with Helm.',
      'Led an Agile team shipping an **AI-powered CRM**, and drove remediation of **20+ security vulnerabilities** to pass a third-party audit.'
    ],
    title: 'Developer II–III'
  },
  {
    company: 'Deop Inc.',
    companyHref: 'https://www.deop.ca/',
    dates: 'Apr 2019 – Mar 2022 · Toronto, ON',
    highlights: [
      'Built client projects in Java (Spring) and Node.js, running on **Kubernetes** with RabbitMQ-based microservices.',
      'Deployed **Keycloak** on Kubernetes with **MFA**, and secured Node.js, Spring and React apps with OpenID Connect and OAuth.'
    ],
    title: 'Developer I–II'
  }
]

export const currentRole = experience[0]

export const githubUsername = 'afc-afc0'

export const links = {
  email: 'mailto:ahmet_fatih_cengiz@hotmail.com',
  github: `https://github.com/${githubUsername}`,
  linkedin: 'https://www.linkedin.com/in/ahmet-fatih-cengiz'
}

export const achievements = [
  'Created and maintained a custom form and workflow management application used by **100,000+ students and faculty members** across US colleges.',
  'Directed the transition of **20+ .NET Framework applications** to .NET 6/8 and Node.js APIs with a Next.js UI, deployed to Kubernetes and Azure App Service.',
  'Built a vulnerability detection system for Kubernetes clusters at a leading Canadian professional services firm: **1000+ pods scanned**, **100+ critical-risk pods isolated**.'
]

export const projects: { name: string; status: string; summary: string; href?: string }[] = [
  {
    name: 'DreamAuth',
    status: 'Ongoing',
    summary:
      'A **multi-tenant authentication server** in Go that keeps each user’s data in the region the law requires, with open-source SDKs and a Terraform provider.'
  },
  {
    name: 'DailyFlow',
    status: 'Ongoing',
    summary: 'A day planner for developers with a **desktop agent** that records what actually happened and asks before it acts.'
  },
  {
    href: 'https://book.myhtra.co/',
    name: 'Michael Novak, MD',
    status: 'Ongoing',
    summary: 'My first novel, written in an AI-assisted studio built on **custom Claude Code skills**. I approve every line.'
  },
  {
    href: 'https://healtify.co/',
    name: 'Healtify',
    status: 'Nov 2025 – Feb 2026',
    summary: 'A **HIPAA-compliant telehealth platform**. **I led the team** building it on Next.js, Node.js and Azure.'
  }
]
