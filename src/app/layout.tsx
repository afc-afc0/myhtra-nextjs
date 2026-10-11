import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Rubik } from 'next/font/google'
import { Navbar } from '@components/ui/Navbar/Navbar'
import { ClientSideContextProviders } from '@contexts/ClientSideContextProviders/ClientSideContextProviders'
import { Toaster } from '@components/ui/Toast/Toaster/Toaster'

const rubik = Rubik({ subsets: ['latin'] })

const description =
  'Founder-led software studio in Toronto. We design, build and run AI agents, Azure and Kubernetes platforms, and web apps that hold up in production.'

// No canonical / openGraph.url here: children would inherit them. Each page sets its own canonical.
export const metadata: Metadata = {
  applicationName: 'Myhtra Studios',
  description,
  icons: {
    icon: '/icon.ico'
  },
  metadataBase: new URL('https://myhtra.co'),
  openGraph: {
    description,
    locale: 'en_CA',
    siteName: 'Myhtra Studios',
    type: 'website'
  },
  robots: { follow: true, googleBot: { follow: true, index: true, 'max-image-preview': 'large' }, index: true },
  title: {
    default: 'Myhtra Studios | AI agents, cloud & web apps, Toronto',
    template: '%s | Myhtra Studios'
  },
  twitter: { card: 'summary_large_image' }
}

export const viewport: Viewport = {
  themeColor: [
    { color: '#ffffff', media: '(prefers-color-scheme: light)' },
    { color: '#000000', media: '(prefers-color-scheme: dark)' }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={rubik.className}>
        <ClientSideContextProviders>
          <Navbar />
          {children}
          <Toaster />
        </ClientSideContextProviders>
      </body>
    </html>
  )
}
