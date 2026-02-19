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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exodar.market'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Exodar Market - WoW TBC Classic Anniversary Edition Services',
    template: '%s | Exodar Market',
  },
  description: 'Your trusted marketplace for World of Warcraft: The Burning Crusade Classic Anniversary Edition. Gold, character boosting, and premium accounts. Fast, secure, and reliable.',
  keywords: [
    'WoW TBC Classic',
    'Burning Crusade Anniversary',
    'WoW gold',
    'TBC gold buy',
    'WoW boosting',
    'WoW accounts',
    'TBC Classic Anniversary Edition',
    'World of Warcraft marketplace',
    'Exodar Market',
  ],
  authors: [{ name: 'Exodar Market' }],
  creator: 'Exodar Market',
  publisher: 'Exodar Market',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Exodar Market',
    title: 'Exodar Market - WoW TBC Classic Anniversary Edition Services',
    description: 'Your trusted marketplace for World of Warcraft: The Burning Crusade Classic Anniversary Edition. Gold, character boosting, and premium accounts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exodar Market - WoW TBC Classic Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exodar Market - WoW TBC Classic Anniversary Edition',
    description: 'Gold, boosting, and premium accounts for WoW TBC Classic Anniversary Edition. Fast delivery, 24/7 support.',
    images: ['/og-image.jpg'],
  },
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
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
