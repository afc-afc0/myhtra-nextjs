'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@utils/format/format'
import { Section } from '../Section/Section'

import styles from './Writing.module.css'

interface PostSummary {
  id: string | number
  name: string
  createdAtUtc: string
}

const fetchPosts = async (): Promise<PostSummary[]> => {
  const response = await fetch('/api/post', { headers: { 'Content-Type': 'application/json' }, method: 'GET' })
  if (!response.ok) throw new Error('Failed to fetch posts: ' + response.statusText)
  const data = await response.json()
  return Array.isArray(data) ? data : []
}

export const Writing = () => {
  const { data: posts = [] } = useQuery({ queryFn: fetchPosts, queryKey: ['posts'] })

  return (
    <Section id="writing" eyebrow="Writing" title="Notes from the work.">
      {posts.length === 0 ? (
        <p className={styles.empty}>New posts are on the way.</p>
      ) : (
        <ul className={styles.list}>
          {posts.slice(0, 6).map((p) => (
            <li key={p.id}>
              <Link className={styles.post} href={`/blog/${p.id}`}>
                <span className={styles.title}>{p.name}</span>
                <span className={styles.date}>{formatDate(p.createdAtUtc)}</span>
                <span className={styles.arrow} aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link className={styles.all} href="/blog">
        All posts →
      </Link>
    </Section>
  )
}
