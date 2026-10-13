// Facts only, in Ahmet's own wording (from the profile card, commit d3374b7). **Bold** marks what matters most.
// `highlights` are the short home-page version. `resume.bullets` follow the Headless Headhunter template
// (see .claude/skills/resume): a plain-English summary first, then keyword + how + result, past tense, no bold.

export const experience = [
  {
    company: 'PwC Canada',
    companyHref: 'https://www.pwc.com/ca/en.html',
    dates: 'Dec 2025 – Present · Toronto, ON',
    highlights: [
      'Building an **agentic AI platform** that automates cloud migration and Azure resource management through natural-language workflows, replacing manual Terraform Enterprise operations.',
      'Contributed to **~$2–3M in annual savings** by retiring Terraform Enterprise licensing in favour of an open-source toolchain with Azure-native state.',
      'Cut per-request LLM spend with **multi-tier caching** on Claude via Amazon Bedrock, using Langfuse traces to drive few-shot selection and prompt refinement.',
      'Shipped a **conversational Azure provisioning agent**: intent capture, Terraform plan generation, security remediation and policy advisory, gated by **human approval**.'
    ],
    resume: {
      bullets: [
        'Built AI tools in Python that let teams manage Azure resources in plain English instead of Terraform.',
        'Designed and built an agentic AI platform in Python using LLM tool calling, multi-step workflows and retrieval-augmented generation (RAG) to automate cloud migration and Azure resource management.',
        'Led the team’s repository standards for AI coding agents (Claude Code), with a PRD, ADRs, spec-first tickets and a CI gate that checks every reference, so features shipped faster and more consistently.',
        'Shipped a conversational Azure provisioning agent for Terraform plan generation, security remediation and Azure Policy advice, gated by human approval.',
        'Ran evals on agent trajectories in Langfuse to pick few-shot examples and refine prompts.',
        'Cut LLM spend on Claude via Amazon Bedrock on AWS with multi-tier caching of prompts and tool outputs.',
        'Moved infrastructure from Terraform Enterprise to an open-source toolchain with Azure-native state management, contributing to about $2–3M in annual licensing savings.'
      ],
      dates: 'December 2025 to Current'
    },
    title: 'Senior Software Developer'
  },
  // Left off on purpose: ~9 months full-time, overlapping Synoptek.
  // {
  //   company: 'Method:CRM',
  //   companyHref: 'https://www.method.me/',
  //   dates: 'Nov 2024 – ~Aug 2025 · Toronto, ON',
  //   highlights: [
  //     'Built and shipped an **AI-powered CRM** that scores customer importance and recommends next steps.',
  //     'Led a bottleneck analysis and refactoring roadmap that cut code complexity and resolved **50+ bugs**.',
  //     'Found **20+ security vulnerabilities** (XSS, SQL injection) and led the fixes to pass a **third-party security audit**.'
  //   ],
  //   title: 'Senior Software Developer'
  // },
  {
    company: 'Synoptek',
    companyHref: 'https://synoptek.com/',
    dates: 'Apr 2022 – Nov 2025 · Toronto, ON',
    highlights: [
      'Directed the move of **20 legacy .NET Framework apps** to .NET 6/8 and Node.js, with a Next.js frontend and a shared React component library.',
      'Implemented **IAM patterns** (JWT lifecycle, PKCE, refresh token rotation) and CI/CD to Azure App Service, IIS and Kubernetes with Helm.',
      'Built data access with **EF Core, Dapper** and raw SQL on PostgreSQL and SQL Server, with MongoDB for documents.'
    ],
    resume: {
      bullets: [
        'Built and modernized full-stack web apps for clients with C#, .NET, React and TypeScript on Azure and Kubernetes.',
        'Built and maintained a form and workflow app used by 100,000+ students and faculty at US colleges.',
        'Migrated 20 legacy .NET Framework applications to .NET 6/8 and Node.js REST APIs documented with Swagger, with a Next.js frontend, improving performance and maintainability.',
        'Built a shared React component library in TypeScript to keep every interface on brand.',
        'Implemented authentication and authorization across distributed microservices with JWT token lifecycle, PKCE flow and refresh token rotation to keep sessions secure.',
        'Built CI/CD pipelines in Azure DevOps and GitHub Actions with Docker and Helm to deploy to Azure App Service, IIS and Kubernetes.',
        'Used EF Core, Dapper and raw SQL on PostgreSQL and SQL Server, with MongoDB for documents.',
        'Turned requirements from non-technical client stakeholders into clear technical designs.'
      ],
      dates: 'April 2022 to November 2025'
    },
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
    resume: {
      bullets: [
        'Built and secured web applications for clients with Java Spring and JavaScript on Node.js and Kubernetes.',
        'Deployed Keycloak on Kubernetes with Docker to give client applications central identity management with Multi-Factor Authentication (MFA).',
        'Implemented OpenID Connect and OAuth across Node.js, Java Spring and React applications to secure both frontend and backend.',
        'Ran Node.js microservices on Kubernetes with RabbitMQ for reliable messaging between services.'
      ],
      dates: 'April 2019 to March 2022'
    },
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

// Projects with `resume` bullets (3 at most, no dates) also appear on /resume, in this order.
export const projects: { name: string; status: string; summary: string; href?: string; resume?: string[] }[] = [
  {
    href: 'https://healtify.co/',
    name: 'Healtify',
    resume: [
      'Led a team building a HIPAA-compliant telehealth platform end to end with a Node.js backend, Next.js frontend and Azure infrastructure provisioned in Terraform.',
      'Secured patient data with Zero Trust networking (Cloudflare WARP, private endpoints, 8 subnets) and Microsoft Entra ID role-based access control.',
      'Deployed HL7 FHIR (HAPI) and SNOMED CT servers for clinical data interoperability, and integrated Claude AI for health assessments, Stripe for payments and Daily.co for video visits.'
    ],
    status: 'Nov 2025 – Feb 2026',
    summary: 'A **HIPAA-compliant telehealth platform**. **I led the team** building it on Next.js, Node.js and Azure.'
  },
  {
    name: 'Kubernetes vulnerability scanner',
    resume: [
      'Built a Python service on Trivy that scanned 1000+ pods across production and testing Kubernetes clusters for a Canadian professional services firm.',
      'Ranked findings by CVSS score and fix availability, alerted on critical issues and isolated 100+ risky pods.'
    ],
    status: '2023',
    summary:
      'Python service on **Trivy** that scans every pod, ranks findings by CVSS, severity and fix availability, alerts on critical issues and **isolates risky pods**.'
  },
  {
    // Not on the resume until it ships: resume bullets claim finished work.
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
  }
]

// Resume-only header and education facts.
export const resume = {
  certificates: 'Kubernetes certifications CKA, CKAD, KCSA and KCNA from the Linux Foundation',
  // Not completed: list the field of study only, no degree or status. Education & Certificates sits at the bottom of the resume.
  education: 'Computer Engineering at Ankara University',
  location: 'Toronto, ON',
  name: 'Ahmet Cengiz',
  phone: '(647) 857-1072'
}
