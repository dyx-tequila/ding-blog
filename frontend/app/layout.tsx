import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '丁宇轩的个人博客',
  description: '前端开发工程师，专注于 Web 技术和鸿蒙开发',
  keywords: '前端开发,React,Next.js,HarmonyOS,博客',
  authors: [{ name: '丁宇轩' }],
  openGraph: {
    title: '丁宇轩的个人博客',
    description: '前端开发工程师，专注于 Web 技术和鸿蒙开发',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
