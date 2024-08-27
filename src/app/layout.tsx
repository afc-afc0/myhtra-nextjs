import { Rubik } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/src/components/ui/Navbar/Navbar"
import { ClientSideContextProviders } from "@/src/contexts/ClientSideContextProviders/ClientSideContextProviders"

const inter = Rubik({ subsets: ["latin"]})

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
        </ClientSideContextProviders>
      </body>
    </html>
  )
}
