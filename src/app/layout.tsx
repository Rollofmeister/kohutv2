import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  title: {
    default:
      'Fisioterapia e Pilates em Campo Mourão | Geovana Kohut',
    template: '%s | Geovana Kohut Fisioterapia e Pilates',
  },
  description:
    'Fisioterapeuta em Campo Mourão - PR | CREFITO 375039-F. Pilates terapêutico individualizado, fisioterapia clínica, geriátrica e home care. Agende sua avaliação pelo WhatsApp.',
  keywords: [
    'fisioterapia Campo Mourão',
    'pilates Campo Mourão',
    'pilates terapêutico Campo Mourão',
    'fisioterapeuta Campo Mourão',
    'fisioterapia home care Campo Mourão',
    'pilates para gestantes Campo Mourão',
    'pilates para idosos Campo Mourão',
    'fisioterapia geriátrica Campo Mourão',
    'dor nas costas fisioterapia Campo Mourão',
    'reabilitação Campo Mourão',
    'pilates para dores',
    'fisioterapia clínica Campo Mourão PR',
    'Geovana Kohut',
    'CREFITO 375039-F',
  ],
  metadataBase: new URL('https://kohutfisiopilates.com'),
  alternates: {
    canonical: 'https://kohutfisiopilates.com',
  },
  openGraph: {
    title: 'Fisioterapia e Pilates em Campo Mourão | Geovana Kohut',
    description:
      'Pilates terapêutico individualizado e fisioterapia clínica em Campo Mourão - PR. Atendimento humanizado para alívio de dores, reabilitação e qualidade de vida.',
    url: 'https://kohutfisiopilates.com',
    siteName: 'Geovana Kohut Fisioterapia e Pilates',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fisioterapia e Pilates em Campo Mourão | Geovana Kohut',
    description:
      'Pilates terapêutico individualizado e fisioterapia clínica em Campo Mourão - PR. Agende sua avaliação pelo WhatsApp.',
    images: ['/opengraph-image'],
  },
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
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
}

const schemaLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': ['PhysicalTherapy', 'MedicalBusiness', 'LocalBusiness'],
  '@id': 'https://kohutfisiopilates.com/#business',
  name: 'Geovana Kohut Fisioterapia e Pilates',
  alternateName: 'Kohut Fisio Pilates',
  description:
    'Fisioterapia clínica e pilates terapêutico individualizado em Campo Mourão - PR. Atendimento humanizado para alívio de dores, reabilitação, melhora da postura e qualidade de vida.',
  image: 'https://kohutfisiopilates.com/kohut-pro.webp',
  logo: 'https://kohutfisiopilates.com/logo-geovana.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Jorge Walter, 2270, Centro',
    addressLocality: 'Campo Mourão',
    addressRegion: 'PR',
    postalCode: '87303-060',
    addressCountry: 'BR',
  },
  telephone: '+5544998343726',
  email: 'contato@kohutfisiopilates.com',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -24.0329216,
    longitude: -52.3777482,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '20:00',
    },
  ],
  url: 'https://kohutfisiopilates.com',
  sameAs: [
    'https://instagram.com/kohut.fisiopilates',
    'https://maps.app.goo.gl/4cabH2ZEFdgtaQs68',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '2',
    bestRating: '5',
    worstRating: '1',
  },
  priceRange: '$$',
  paymentAccepted: 'Dinheiro, Cartão de Crédito, PIX',
  areaServed: {
    '@type': 'City',
    name: 'Campo Mourão',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Paraná',
      containedInPlace: { '@type': 'Country', name: 'Brasil' },
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de Fisioterapia e Pilates',
    itemListElement: [
      {
        '@type': 'Service',
        name: 'Pilates Terapêutico',
        description:
          'Pilates individualizado para alívio de dores musculares, posturais e articulares em Campo Mourão.',
      },
      {
        '@type': 'Service',
        name: 'Pilates para Gestantes',
        description:
          'Pilates adaptado para cada trimestre da gestação, aliviando desconfortos e preparando o corpo para o parto.',
      },
      {
        '@type': 'Service',
        name: 'Pilates para Idosos',
        description:
          'Fortalecimento, equilíbrio e mobilidade para mais qualidade de vida e independência na terceira idade.',
      },
      {
        '@type': 'Service',
        name: 'Fisioterapia Geriátrica',
        description:
          'Reabilitação e manutenção funcional para a terceira idade em Campo Mourão.',
      },
      {
        '@type': 'Service',
        name: 'Fisioterapia Home Care',
        description:
          'Atendimento domiciliar de fisioterapia em Campo Mourão e região.',
      },
      {
        '@type': 'Service',
        name: 'Fisioterapia Clínica Geral',
        description:
          'Tratamento de lesões musculoesqueléticas e reabilitação funcional em Campo Mourão.',
      },
    ],
  },
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Nunca fiz pilates. Posso começar em Campo Mourão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! O pilates terapêutico em Campo Mourão é indicado para todos os níveis, inclusive iniciantes absolutos. A avaliação inicial serve justamente para entender seu histórico e criar um plano seguro e progressivo para você.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tenho dor nas costas. Pilates terapêutico é indicado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Com certeza. O pilates terapêutico é uma das principais ferramentas para alívio de dores musculares, posturais e articulares. Os exercícios são adaptados à sua condição atual — você nunca vai ser levado além do que seu corpo permite.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona a primeira avaliação de fisioterapia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A avaliação é uma conversa sobre suas dores, histórico de saúde e objetivos. Em seguida, é feita uma análise postural e de movimento. Com isso, é montado um plano personalizado para você. O agendamento é pelo WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'A fisioterapeuta atende em casa em Campo Mourão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! Geovana Kohut oferece atendimento de fisioterapia home care em Campo Mourão e região. Entre em contato pelo WhatsApp para verificar disponibilidade e área de atendimento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pilates para gestantes em Campo Mourão — é seguro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, o pilates para gestantes é seguro e recomendado por médicos. As sessões são adaptadas para cada trimestre da gravidez, com foco em conforto, fortalecimento do assoalho pélvico e preparação para o parto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre pilates e fisioterapia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fisioterapia trata lesões e condições clínicas específicas, enquanto o pilates terapêutico trabalha prevenção, fortalecimento e qualidade de vida. No estúdio em Campo Mourão, Geovana Kohut combina as duas abordagens para um cuidado completo e individualizado.',
      },
    },
  ],
}

const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://kohutfisiopilates.com/#person',
  name: 'Geovana Kohut',
  jobTitle: 'Fisioterapeuta e Instrutora de Pilates',
  description:
    'Fisioterapeuta formada pela Unespar com especialização em Pilates Terapêutico, atendendo em Campo Mourão - PR desde 2023.',
  worksFor: { '@id': 'https://kohutfisiopilates.com/#business' },
  url: 'https://kohutfisiopilates.com',
  sameAs: ['https://instagram.com/kohut.fisiopilates'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Unespar',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Registro Profissional',
    name: 'CREFITO 375039-F',
    recognizedBy: {
      '@type': 'Organization',
      name: 'CREFITO — Conselho Regional de Fisioterapia e Terapia Ocupacional',
    },
  },
}

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://kohutfisiopilates.com/#website',
  url: 'https://kohutfisiopilates.com',
  name: 'Geovana Kohut Fisioterapia e Pilates',
  description:
    'Fisioterapeuta em Campo Mourão - PR. Pilates terapêutico individualizado, fisioterapia clínica, geriátrica e home care.',
  inLanguage: 'pt-BR',
  publisher: { '@id': 'https://kohutfisiopilates.com/#business' },
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaLocalBusiness),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
      </head>
      <body className="font-body bg-linho text-pedra">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
