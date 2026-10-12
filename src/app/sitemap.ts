import type { MetadataRoute } from 'next'
import { siteUrl } from '@utils/site/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { changeFrequency: 'monthly', priority: 1, url: siteUrl },
    { changeFrequency: 'weekly', priority: 0.7, url: `${siteUrl}/blog` },
    { changeFrequency: 'yearly', priority: 0.5, url: `${siteUrl}/blog/nextjs-deployment` }
  ]
}
