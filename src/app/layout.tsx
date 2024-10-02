import "./globals.css"
import { Rubik } from "next/font/google"
import { Navbar } from "@components/ui/Navbar/Navbar"
import { ClientSideContextProviders } from "@contexts/ClientSideContextProviders/ClientSideContextProviders"
import { Toaster } from "@components/ui/Toast/Toaster/Toaster"

const inter = Rubik({ subsets: ["latin"]})

export const metadata = {
  title: 'Myhtra',
  description: 'Myhtra Studios',
  icons: {
    icon: '/icon.ico'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientSideContextProviders>
          <Navbar />
          { children }
          <Toaster />
        </ClientSideContextProviders>
      </body>
    </html>
  )
}