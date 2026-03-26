import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Geovana Kohut | Fisioterapia e Pilates em Campo Mourão',
  description:
    'Pilates terapêutico e fisioterapia com atendimento humanizado em Campo Mourão - PR. Agende sua avaliação pelo WhatsApp.',
  metadataBase: new URL('https://kohutfisiopilates.com.br'),
  alternates: {
    canonical: 'https://kohutfisiopilates.com.br',
  },
  openGraph: {
    title: 'Geovana Kohut | Fisioterapia e Pilates em Campo Mourão',
    description:
      'Pilates terapêutico e fisioterapia com atendimento humanizado em Campo Mourão - PR.',
    url: 'https://kohutfisiopilates.com.br',
    siteName: 'Geovana Kohut Fisioterapia e Pilates',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/opengraph-image' }],
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Geovana Kohut Fisioterapia e Pilates',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Jorge Walter, 2270',
    addressLocality: 'Campo Mourão',
    addressRegion: 'PR',
    postalCode: '87303-060',
    addressCountry: 'BR',
  },
  telephone: '+5544998343726',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -24.045,
    longitude: -52.383,
  },
  openingHours: 'Mo-Fr 07:00-20:00',
  url: 'https://kohutfisiopilates.com.br',
  sameAs: ['https://instagram.com/kohut.fisiopilates'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-body bg-linho text-pedra">{children}</body>
    </html>
  )
}
