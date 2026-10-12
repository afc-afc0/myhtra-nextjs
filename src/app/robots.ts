import type { MetadataRoute } from 'next'
import { siteUrl } from '@utils/site/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/', disallow: ['/api/', '/blog/myPosts', '/blog/update/', '/simpleflow', '/ui-components'], userAgent: '*' },
    sitemap: `${siteUrl}/sitemap.xml`
  }
}
