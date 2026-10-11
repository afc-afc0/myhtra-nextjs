import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { changeFrequency: 'monthly', priority: 1, url: 'https://myhtra.co' },
    { changeFrequency: 'weekly', priority: 0.7, url: 'https://myhtra.co/blog' },
    { changeFrequency: 'yearly', priority: 0.5, url: 'https://myhtra.co/blog/nextjs-deployment' }
  ]
}
