import { Card } from '@components/ui/Card/Card'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { githubUsername, links } from '../../_content/profile'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import { Section } from '../Section/Section'

import styles from './GitHubContributions.module.css'

interface Day {
  date: string
  level: number
  weekday: number
  week: number
  label: string
}

// GitHub's public contribution calendar (the same HTML its profile page loads), cached for an hour.
// Day ids are `contribution-day-component-<weekday>-<week>`; each has a matching <tool-tip> with the count.
// Attributes are read one by one, so a change in GitHub's attribute order doesn't empty the graph.
const getContributions = async (): Promise<{ total: string | null; days: Day[] }> => {
  try {
    const res = await fetch(`https://github.com/users/${githubUsername}/contributions`, { next: { revalidate: 3600 } })
    if (!res.ok) return { days: [], total: null }
    const html = await res.text()

    const labels = new Map(
      Array.from(html.matchAll(/for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g), (m) => [m[1], m[2].trim()])
    )
    const days = Array.from(html.matchAll(/<td\b[^>]*\bdata-date="[^"]*"[^>]*>/g), ([tag]) => toDay(tag, labels)).filter(
      (d): d is Day => d !== null
    )
    const total = html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1] ?? null
    return { days, total }
  } catch {
    return { days: [], total: null }
  }
}

const toDay = (tag: string, labels: Map<string, string>): Day | null => {
  const date = tag.match(/\bdata-date="([\d-]+)"/)?.[1]
  const id = tag.match(/\bid="(contribution-day-component-(\d+)-(\d+))"/)
  const level = tag.match(/\bdata-level="(\d)"/)?.[1]
  if (!date || !id || !level) return null
  return { date, label: labels.get(id[1]) ?? date, level: Number(level), week: Number(id[3]), weekday: Number(id[2]) }
}

// Renders nothing (heading included) when GitHub can't be reached.
export const GitHubContributions = async () => {
  const { days, total } = await getContributions()
  if (days.length === 0) return null

  return (
    <Section id="github" title="GitHub contributions">
      <Card>
        {total && <RichText text={`**${total}** contributions in the last year`} />}
        <div className={styles.scroll}>
          <div className={styles.grid} role="img" aria-label={`GitHub contributions in the last year${total ? `: ${total}` : ''}`}>
            {days.map((d) => (
              <span
                key={d.date}
                className={styles.day}
                data-level={d.level}
                style={{ gridColumn: d.week + 1, gridRow: d.weekday + 1 }}
                title={d.label}
              />
            ))}
          </div>
        </div>
        <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="center">
          <ExternalLink href={links.github} tapTarget>
            <Text type={TextType.LINK} text={`github.com/${githubUsername}`} fontSize="s" />
          </ExternalLink>
          <div className={styles.legend} aria-hidden>
            <Text text="Less" fontSize="xs" fontWeight="light" />
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={styles.day} data-level={l} />
            ))}
            <Text text="More" fontSize="xs" fontWeight="light" />
          </div>
        </FlexContainer>
      </Card>
    </Section>
  )
}
