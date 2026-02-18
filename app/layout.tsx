import type { Metadata, Viewport } from 'next'
import { Cinzel, Cinzel_Decorative } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Exodar Market - WoW TBC Classic Anniversary Edition Services',
  description: 'Your trusted marketplace for World of Warcraft: The Burning Crusade Classic Anniversary Edition. Gold, character boosting, and premium accounts. Fast, secure, and reliable.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cinzelDecorative.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#12121a',
              border: '1px solid #2a2a3e',
              color: '#e8dcc8',
              fontFamily: 'Cinzel, Georgia, serif',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
