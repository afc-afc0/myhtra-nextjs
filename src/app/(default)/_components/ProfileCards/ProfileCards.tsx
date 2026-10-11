'use client'
import AhmetImage from '@public/pngs/profileImages/Ahmet.jpeg'
import Image from 'next/image'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { Button } from '@components/ui/Button/Button'
import { DownsizeSVG, ExpandSVG } from '@components/ui/SVG/SVG'
import { Footer } from '@components/ui/Footer/Footer'
import { ExpandableContainer, useExpandable } from '@components/ui/Expandable/Expandable'
import { ConditionalDisplay } from '@components/ui/ConditionalDisplay/ConditionalDisplay'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/Accordion/Accordion'
import Link from 'next/link'

import styles from './ProfileCards.module.css'
import { FocusOnViewButton } from '../CompanyHeader/CompanyHeader'

export const ProfileCards = () => {
  const { isExpanded, toggle } = useExpandable({ initialState: false })

  return (
    <FlexContainer id="profileCards" height="100%" alignItems="center" justifyContent="space-between" flexDirection="column">
      <FlexContainer flexGrow={1} justifyContent="center" alignItems="center">
        <ExpandableContainer isExpanded={isExpanded} initialSize={styles.cardContainer} transitionSize={styles.cardContainerExpanded}>
          <ConditionalDisplay condition={!isExpanded}>
            <Card
              name="Ahmet Cengiz"
              position="Senior Software Developer"
              info="Senior developer with 7+ years of experience building secure web APIs,
              cloud infrastructure and agentic AI platforms.
              Proven ability to ship scalable, well-tested apps used by 100,000+ users."
              isExpanded={isExpanded}
              toggleExpanded={toggle}
            />
          </ConditionalDisplay>
          <ConditionalDisplay condition={isExpanded}>
            <CardExpended />
          </ConditionalDisplay>
        </ExpandableContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

interface CardProps {
  name: string
  position: string
  info: string
  isExpanded: boolean
  toggleExpanded?: () => void
}

const Card = ({ name, position, info, isExpanded, toggleExpanded }: CardProps) => {
  return (
    <FlexContainer width="inherit" height="inherit" borderWidth="l" borderRadius="m" paddingSize="s">
      <FlexContainer marginBottom="s">
        <ProfileImage />
      </FlexContainer>
      <FlexContainer>
        <Text text={name} fontSize="l" fontWeight="bold" />
      </FlexContainer>
      <FlexContainer marginBottom="s">
        <Text text={position} fontSize="m" fontWeight="medium" />
      </FlexContainer>
      <FlexContainer>
        <Text text={info} fontWeight="light" />
      </FlexContainer>
      <FlexContainer width="100%" justifyContent="flex-end" alignItems="flex-end" height="100%" gapSize="s" flexDirection="row">
        <Button size="l" icon={!isExpanded ? <ExpandSVG /> : <DownsizeSVG />} onClick={toggleExpanded} />
        <FocusOnViewButton elementId="blogPosts" />
      </FlexContainer>
    </FlexContainer>
  )
}

const ProfileImage = ({}: {}) => {
  return <Image className={styles.profileImage} src={AhmetImage} alt="Ahmet" width={200} height={200} />
}

const experience = [
  {
    company: 'PwC Canada',
    dates: 'Feb 2026 – Present · Toronto, ON',
    highlights: [
      'Building an agentic AI platform that automates cloud migration and Azure resource management through natural-language workflows, replacing manual Terraform Enterprise operations.',
      'Contributed to ~$2–3M in annual savings by retiring Terraform Enterprise licensing in favour of an open-source toolchain with Azure-native state.',
      'Cut per-request LLM spend with multi-tier caching on Claude via Amazon Bedrock, using Langfuse traces to drive few-shot selection and prompt refinement.',
      'Shipped a conversational Azure provisioning agent: intent capture, Terraform plan generation, security remediation and policy advisory, gated by human approval.'
    ],
    title: 'Senior Software Developer'
  },
  {
    company: 'Synoptek',
    dates: 'Apr 2022 – Nov 2025 · Toronto, ON',
    highlights: [
      'Directed the move of 20 legacy .NET Framework apps to .NET 6/8 and Node.js, with a Next.js frontend and a shared React component library.',
      'Implemented IAM patterns (JWT lifecycle, PKCE, refresh token rotation) and CI/CD to Azure App Service, IIS and Kubernetes with Helm.',
      'Led an Agile team shipping an AI-powered CRM, and drove remediation of 20+ security vulnerabilities to pass a third-party audit.'
    ],
    title: 'Developer II–III'
  },
  {
    company: 'Deop Inc.',
    dates: 'Apr 2019 – Mar 2022 · Toronto, ON',
    highlights: [
      'Built client projects in Java (Spring) and Node.js, running on Kubernetes with RabbitMQ-based microservices.',
      'Deployed Keycloak on Kubernetes with MFA, and secured Node.js, Spring and React apps with OpenID Connect and OAuth.'
    ],
    title: 'Developer I–II'
  }
]

const projects = [
  {
    highlights: [
      'A multi-tenant authentication server in Go that keeps each user’s data in the region the law requires, with open-source SDKs and a Terraform provider.',
      'Built so far: tenants, organizations and roles, the full OpenID Connect sign-in flow, token refresh and revocation, and OpenTelemetry dashboards in Grafana.'
    ],
    name: 'DreamAuth',
    status: 'Ongoing'
  },
  {
    highlights: [
      'A day planner for developers. A small agent on each machine notes what actually happened — calls, meetings, the plan they broke — so the planner does the bookkeeping, and asks before it acts.',
      'Built with Next.js, Express, a Python desktop agent and Terraform.'
    ],
    name: 'DailyFlow',
    status: 'Ongoing'
  },
  {
    highlights: [
      'An AI-assisted writing studio for my first novel, a grounded revenge thriller set in 2026.',
      'Custom Claude Code skills keep the story bible, draft scene by scene and check the manuscript for continuity. I approve every line.'
    ],
    name: 'Book',
    status: 'Ongoing'
  },
  {
    highlights: [
      'A HIPAA-compliant telehealth platform. I led the team building it on Next.js, Node.js and Azure.',
      'Terraform infrastructure with Zero Trust networking, FHIR and SNOMED CT clinical data, Claude for health assessments, Stripe billing and Daily.co video calls.'
    ],
    name: 'Healtify',
    status: 'Nov 2025 – Feb 2026'
  }
]

interface CardExpendedProps {}

const CardExpended = ({}: CardExpendedProps) => {
  return (
    <FlexContainer width="inherit" height="inherit" borderWidth="l" borderRadius="m" paddingSize="s">
      <FlexContainer marginBottom="s">
        <ProfileImage />
      </FlexContainer>
      <FlexContainer width="100%">
        <Text text="Ahmet Cengiz" fontSize="l" fontWeight="bold" />
        <Text text="Senior Software Developer" fontSize="m" fontWeight="medium" />
        <Text text="Toronto, ON" fontSize="m" fontWeight="medium" />
        <FlexContainer marginBottom="s" flexDirection="row">
          <ExpendedCardSocialLinks text="Email" href="mailto:ahmet_fatih_cengiz@hotmail.com" />
          <ExpandedCardSocialLinksSeparator />
          <ExpendedCardSocialLinks text="GitHub" href="http://www.github.com/afc-afc0" />
          <ExpandedCardSocialLinksSeparator />
          <ExpendedCardSocialLinks text="LinkedIn" href="http://www.linkedin.com/in/ahmet-fatih-cengiz" />
        </FlexContainer>
        <FlexContainer width="100%" height="100%">
          <Accordion type="single" collapsible>
            <AccordionItem value="Professional Summary">
              <AccordionTrigger>
                <Text text="Professional Summary" />
              </AccordionTrigger>
              <AccordionContent>
                <Text
                  text="Senior software developer with 7+ years of experience building secure web APIs,
                  cloud infrastructure and user-centric applications. Currently building an agentic AI
                  platform at PwC Canada that automates cloud migration and Azure resource management.
                  Proven ability to develop scalable, well-tested applications used by over 100,000 users
                  across the US, with comprehensive authentication and authorization, infrastructure as code,
                  and automated CI/CD for seamless software delivery, plus a production system for scanning
                  and isolating vulnerable Kubernetes pods."
                  fontSize="s"
                  fontWeight="light"
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Key Achievements">
              <AccordionTrigger>
                <Text text="Key Achievements" />
              </AccordionTrigger>
              <AccordionContent>
                <InlineTextContainer>
                  <Text
                    text="▪Created and maintained a custom form and workflow management application 
                           currently used by over "
                    display="inline"
                    fontSize="s"
                    fontWeight="light"
                  />
                  <Text text={'100,000+ '} display="inline" fontSize="s" fontWeight="medium" />
                  <Text display="inline" text=" students and faculty members across various US colleges." fontSize="s" fontWeight="light" />
                </InlineTextContainer>
                <InlineTextContainer>
                  <Text display="inline" text="▪Directed the transition of " fontSize="s" fontWeight="light" />
                  <Text display="inline" text={'20+ .NET Framework '} fontSize="s" fontWeight="medium" />
                  <Text display="inline" text="applications by adopting " fontSize="s" fontWeight="light" />
                  <Text display="inline" text={'.NET 6/8 '} fontSize="s" fontWeight="medium" />
                  <Text display="inline" text="and " fontSize="s" fontWeight="light" />
                  <Text display="inline" text={'Node.js '} fontSize="s" fontWeight="medium" />
                  <Text display="inline" text="APIs for the backend, and integrating the UI with " fontSize="s" fontWeight="light" />
                  <Text display="inline" text={'Next.js. '} fontSize="s" fontWeight="medium" />
                  <Text display="inline" text="Deployed these applications to " fontSize="s" fontWeight="light" />
                  <Text display="inline" text={'Kubernetes '} fontSize="s" fontWeight="medium" />
                  <Text display="inline" text="and " fontSize="s" fontWeight="light" />
                  <Text display="inline" text={'Azure App Service '} fontSize="s" fontWeight="medium" />
                  <Text
                    display="inline"
                    text="environments, resulting in substantial improvements in both performance, user interaction and better maintenance."
                    fontSize="s"
                    fontWeight="light"
                  />
                </InlineTextContainer>
                <InlineTextContainer>
                  <Text
                    display="inline"
                    text="▪Developed and implemented a robust vulnerability detection system for "
                    fontSize="s"
                    fontWeight="light"
                  />
                  <Text display="inline" text={'Kubernetes '} fontSize="s" fontWeight="medium" />
                  <Text
                    display="inline"
                    text="clusters for a leading Canadian professional services firm. The system scanned "
                    fontSize="s"
                    fontWeight="light"
                  />
                  <Text display="inline" text={'1000+ '} fontSize="s" fontWeight="medium" />
                  <Text
                    display="inline"
                    text="pods, identified and prioritized vulnerabilities by severity, automated notifications, and isolated "
                    fontSize="s"
                    fontWeight="light"
                  />
                  <Text display="inline" text={'100+ '} fontSize="s" fontWeight="medium" />
                  <Text display="inline" text="critical-risk pods and counting." fontSize="s" fontWeight="light" />
                </InlineTextContainer>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Experience">
              <AccordionTrigger>
                <Text text="Experience" />
              </AccordionTrigger>
              <AccordionContent>
                {experience.map((job) => (
                  <InlineTextContainer key={job.company}>
                    <Text text={`${job.title} · ${job.company}`} fontSize="s" fontWeight="medium" />
                    <Text text={job.dates} fontSize="xs" fontWeight="light" />
                    {job.highlights.map((highlight) => (
                      <Text key={highlight} text={`▪${highlight}`} fontSize="s" fontWeight="light" />
                    ))}
                  </InlineTextContainer>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Projects">
              <AccordionTrigger>
                <Text text="Projects" />
              </AccordionTrigger>
              <AccordionContent>
                {projects.map((project) => (
                  <InlineTextContainer key={project.name}>
                    <Text text={`${project.name} · ${project.status}`} fontSize="s" fontWeight="medium" />
                    {project.highlights.map((highlight) => (
                      <Text key={highlight} text={`▪${highlight}`} fontSize="s" fontWeight="light" />
                    ))}
                  </InlineTextContainer>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

const ExpandedCardSocialLinksSeparator = ({}) => {
  return <Text text={'\u00A0\u00A0|\u00A0\u00A0'} fontWeight="medium" />
}

const ExpendedCardSocialLinks = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link target="_blank" rel="noopener noreferrer" href={href}>
      <Text type={TextType.LINK} text={text} fontWeight="medium" />
    </Link>
  )
}

const InlineTextContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.inlineTextContainer}>{children}</div>
}
