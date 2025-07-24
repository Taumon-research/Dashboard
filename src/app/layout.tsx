import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/ui/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Taumon AI Dashboard",
  description: "Enterprise AI content creation platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl floating" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-200 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }} />
          </div>
          
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <Header />
            <main className="flex-1 overflow-auto relative fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="min-h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}