import { FlexContainer } from '@components/ui/Layout/FlexContainer/FlexContainer'
import { Text } from '@components/ui/Text/Text'
import { formatDate } from '@utils/format/format'

import styles from './GitHubRepos.module.css'

const username = 'afc-afc0'

interface Repo {
  id: number
  name: string
  description: string | null
  language: string | null
  html_url: string
  pushed_at: string
  fork: boolean
}

// Public GitHub API, no token needed; cached for an hour so the page stays static.
const getRepos = async (): Promise<Repo[]> => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    const repos: Repo[] = await res.json()
    return repos.filter((r) => !r.fork && r.name !== username).slice(0, 6)
  } catch {
    return []
  }
}

export const GitHubRepos = async () => {
  const repos = await getRepos()
  if (repos.length === 0) return null

  return (
    <FlexContainer width="100%" gapSize="s">
      {repos.map((repo) => (
        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoContainer}>
          <FlexContainer borderWidth="s" borderRadius="s" paddingSize="s" gapSize="s" height="auto">
            <Text text={repo.name} fontSize="xxl" />
            {repo.description && <Text text={repo.description} fontWeight="light" />}
            <FlexContainer flexDirection="row" width="100%" justifyContent="space-between" alignItems="flex-start">
              <Text text={repo.language ?? ''} fontWeight="light" />
              <Text text={formatDate(repo.pushed_at)} fontWeight="light" />
            </FlexContainer>
          </FlexContainer>
        </a>
      ))}
    </FlexContainer>
  )
}
