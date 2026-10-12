import Link from 'next/link'
import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text, TextType } from '@components/ui/Text/Text'
import { RichText } from '@components/ui/Text/RichText'
import { Card } from '../Card/Card'

import styles from './GitHubContributions.module.css'

const username = 'afc-afc0'

interface Day {
  date: string
  level: number
  weekday: number
  week: number
  label: string
}

// GitHub's public contribution calendar (the same HTML its profile page loads), cached for an hour.
// Day ids are `contribution-day-component-<weekday>-<week>`; each has a matching <tool-tip> with the count.
const getContributions = async (): Promise<{ total: string | null; days: Day[] }> => {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, { next: { revalidate: 3600 } })
    if (!res.ok) return { days: [], total: null }
    const html = await res.text()

    const labels = new Map(
      Array.from(html.matchAll(/for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g), (m) => [m[1], m[2].trim()])
    )
    const days = Array.from(html.matchAll(/data-date="([\d-]+)" id="contribution-day-component-(\d+)-(\d+)" data-level="(\d)"/g), (m) => ({
      date: m[1],
      label: labels.get(`contribution-day-component-${m[2]}-${m[3]}`) ?? m[1],
      level: Number(m[4]),
      week: Number(m[3]),
      weekday: Number(m[2])
    }))
    const total = html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1] ?? null
    return { days, total }
  } catch {
    return { days: [], total: null }
  }
}

export const GitHubContributions = async () => {
  const { days, total } = await getContributions()
  if (days.length === 0) return null

  return (
    <Card>
      {total && <RichText text={`**${total}** contributions in the last year`} />}
      <div className={styles.scroll}>
        <div className={styles.grid} role="grid" aria-label="GitHub contributions in the last year">
          {days.map((d) => (
            <span
              key={d.date}
              className={styles.day}
              data-level={d.level}
              style={{ gridColumn: d.week + 1, gridRow: d.weekday + 1 }}
              title={d.label}
              aria-label={d.label}
              role="gridcell"
            />
          ))}
        </div>
      </div>
      <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="center">
        <Link href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className={styles.tapTarget}>
          <Text type={TextType.LINK} text={`github.com/${username}`} fontSize="s" />
        </Link>
        <div className={styles.legend} aria-hidden>
          <Text text="Less" fontSize="xs" fontWeight="light" />
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={styles.day} data-level={l} />
          ))}
          <Text text="More" fontSize="xs" fontWeight="light" />
        </div>
      </FlexContainer>
    </Card>
  )
}
