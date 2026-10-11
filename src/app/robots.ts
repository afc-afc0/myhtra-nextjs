import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/', disallow: ['/api/', '/blog/myPosts', '/blog/update/', '/simpleflow', '/ui-components'], userAgent: '*' },
    sitemap: 'https://myhtra.co/sitemap.xml'
  }
}
