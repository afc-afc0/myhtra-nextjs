import { Rubik } from "next/font/google"
import "./globals.css"
import { ClientSideContextProviders } from "../../contexts/ClientSideContextProviders/ClientSideContextProviders"
import { Navbar } from "@/components/ui/Navbar/Navbar"

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
