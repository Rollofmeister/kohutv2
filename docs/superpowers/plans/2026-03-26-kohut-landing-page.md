# Kohut Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversion-focused landing page for Geovana Kohut Fisioterapia e Pilates that drives WhatsApp bookings.

**Architecture:** Next.js 15 App Router with Server Components by default; client components only where Framer Motion or browser APIs are required. Content centralized in `lib/data.ts`, constants in `lib/constants.ts`. 11 sections composed in `app/page.tsx`. No backend, no forms — all conversion via WhatsApp.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, next/font (Cormorant Garamond + DM Sans), next-sitemap

---

## Images required (user must place in `public/` before running dev)

- `public/profissional.webp` — portrait photo for hero
- `public/kohut-pro.webp` — photo for about section
- `public/logo-geovana.jpg` — logo for navbar
- `public/galeria/espaco-cadillac-reformer.webp`
- `public/galeria/espaco-biombos.webp`
- `public/galeria/espaco-sala-espelho.webp`
- `public/galeria/espaco-visao-geral.webp`
- `public/galeria/espaco-panoramica.webp`

> Until images are added, use `/placeholder.svg` or any local image. The layout will still render correctly.

---

## Task 1: Scaffold project + install dependencies

**Files:**
- Create: `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` (via create-next-app)

- [ ] **Step 1: Scaffold Next.js 15 into current directory**

```bash
cd /home/luiz/Documents/kohutv2
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --turbopack --yes
```

When prompted "A package.json already exists — overwrite?" → answer No if docs folder is preserved. If it conflicts, scaffold in a temp dir then move:
```bash
npx create-next-app@latest /tmp/kohut-scaffold --typescript --tailwind --app --src-dir --no-eslint --turbopack --yes
cp -r /tmp/kohut-scaffold/. /home/luiz/Documents/kohutv2/
```

- [ ] **Step 2: Install additional dependencies**

```bash
cd /home/luiz/Documents/kohutv2
npm install framer-motion next-sitemap
```

- [ ] **Step 3: Upgrade Tailwind CSS v3 → v4**

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@^4 @tailwindcss/postcss
```

- [ ] **Step 4: Update postcss.config.mjs**

Replace the entire file:

```js
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

- [ ] **Step 5: Delete tailwind.config.ts (v4 uses CSS-only config)**

```bash
rm -f tailwind.config.ts tailwind.config.js
```

- [ ] **Step 6: Update next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
}

export default nextConfig
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: `✓ Ready in ~Xs` on http://localhost:3000. A Next.js default page loads.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 15 with Tailwind v4 and Framer Motion"
```

---

## Task 2: Design tokens, global styles, and fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite src/app/globals.css**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-linho: #F4EFE6;
  --color-salvia: #6B8F71;
  --color-pedra: #3D3635;
  --color-casca: #7A6458;
  --color-borda: #EBE5DC;

  /* Typography */
  --font-display: var(--font-cormorant), Georgia, serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;

  /* Border radius */
  --radius-card: 1.2rem;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-warm: 0 4px 24px rgba(61, 54, 53, 0.08);
  --shadow-warm-lg: 0 8px 40px rgba(61, 54, 53, 0.12);
}

@layer base {
  html {
    font-family: var(--font-body);
    color: var(--color-pedra);
    background-color: var(--color-linho);
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  * {
    touch-action: manipulation;
  }

  h1, h2, h3 {
    font-family: var(--font-display);
  }
}
```

- [ ] **Step 2: Rewrite src/app/layout.tsx**

```tsx
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
```

- [ ] **Step 3: Verify build compiles**

```bash
npm run build
```

Expected: `✓ Compiled successfully` (or no TypeScript errors).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add design tokens, fonts, and global styles"
```

---

## Task 3: lib/constants.ts and lib/data.ts

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/data.ts`

- [ ] **Step 1: Create src/lib/constants.ts**

```ts
export const WHATSAPP_URL =
  'https://wa.me/5544998343726?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação%20de%20pilates'

export const MAPS_URL = 'https://maps.app.goo.gl/4cabH2ZEFdgtaQs68'

export const INSTAGRAM_URL = 'https://instagram.com/kohut.fisiopilates'

export const PHONE = '+5544998343726'

export const ADDRESS = 'Av. Jorge Walter, 2270 — Centro, Campo Mourão - PR'

export const HOURS = 'Segunda a Sexta, 07h–20h'

export const CREFITO = 'CREFITO 375039-F'
```

- [ ] **Step 2: Create src/lib/data.ts**

```ts
export interface Testimonial {
  name: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Service {
  title: string
  description: string
}

export interface ServiceGroup {
  label: string
  services: Service[]
}

export interface Credential {
  label: string
  value: string
}

export interface GalleryImage {
  src: string
  alt: string
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    name: 'Jaqueline Kohut',
    text: 'Comecei o pilates com a Geovana após anos sofrendo com dores nas costas. Em poucos meses minha postura melhorou muito e as dores praticamente desapareceram. Recomendo de olhos fechados!',
  },
  {
    name: 'Addlyz Karina',
    text: 'A Geovana é uma profissional incrível. Ela cuida de cada detalhe do atendimento e adapta os exercícios às minhas limitações. Me sinto acolhida e segura em todas as sessões.',
  },
  {
    name: 'Jociane Rodrigues',
    text: 'Fiz fisioterapia com a Geovana depois de uma cirurgia e a recuperação foi muito além das minhas expectativas. Ela é dedicada, paciente e muito competente.',
  },
  {
    name: 'Amanda Rodrigues',
    text: 'O pilates terapêutico mudou minha qualidade de vida. A Geovana entende exatamente o que você precisa e cria um plano personalizado. Vale cada sessão!',
  },
  {
    name: 'Fernanda Nunes',
    text: 'Indicaria a Geovana para qualquer pessoa que busca um atendimento humanizado e eficiente. Ela une técnica e cuidado de um jeito que poucos profissionais conseguem.',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqs: FaqItem[] = [
  {
    question: 'Nunca fiz pilates. Posso começar?',
    answer:
      'Sim! O pilates terapêutico é indicado para todos os níveis, inclusive iniciantes absolutos. A avaliação inicial serve justamente para entender seu histórico e criar um plano seguro e progressivo para você.',
  },
  {
    question: 'Tenho dor para me movimentar. É indicado?',
    answer:
      'Com certeza. O pilates terapêutico é uma das principais ferramentas para alívio de dores musculares, posturais e articulares. Os exercícios são adaptados à sua condição atual — você nunca vai ser levado além do que seu corpo permite.',
  },
  {
    question: 'Como funciona a primeira avaliação?',
    answer:
      'A avaliação é uma conversa sobre suas dores, histórico de saúde e objetivos. Em seguida, faço uma análise postural e de movimento. Com isso, monto um plano personalizado para você. O agendamento é pelo WhatsApp.',
  },
  {
    question: 'A Geovana atende em casa em Campo Mourão?',
    answer:
      'Sim! Ofereço atendimento de fisioterapia home care em Campo Mourão e região. Entre em contato pelo WhatsApp para verificar disponibilidade e área de atendimento.',
  },
]

// ─── Services ────────────────────────────────────────────────────────────────

export const serviceGroups: ServiceGroup[] = [
  {
    label: 'Pilates Terapêutico',
    services: [
      {
        title: 'Dores em geral',
        description:
          'Alívio e prevenção de dores musculares, posturais e articulares com exercícios individualizados.',
      },
      {
        title: 'Gestantes',
        description:
          'Pilates adaptado para cada trimestre, aliviando desconfortos e preparando o corpo para o parto.',
      },
      {
        title: 'Idosos',
        description:
          'Fortalecimento, equilíbrio e mobilidade para mais qualidade de vida e independência.',
      },
      {
        title: 'Atletas',
        description:
          'Condicionamento, prevenção de lesões e recuperação de performance para esportistas.',
      },
    ],
  },
  {
    label: 'Fisioterapia',
    services: [
      {
        title: 'Fisioterapia Geriátrica',
        description:
          'Reabilitação e manutenção funcional para a terceira idade, com foco em autonomia e qualidade de vida.',
      },
      {
        title: 'Home Care',
        description:
          'Atendimento domiciliar em Campo Mourão e região para pacientes com dificuldade de locomoção.',
      },
      {
        title: 'Fisioterapia Clínica Geral',
        description:
          'Tratamento de lesões musculoesqueléticas, pós-operatório e reabilitação funcional.',
      },
    ],
  },
]

// ─── Credentials ─────────────────────────────────────────────────────────────

export const credentials: Credential[] = [
  { label: 'Formação', value: 'Fisioterapia — Unespar' },
  { label: 'Especialização', value: 'Pilates Terapêutico' },
  { label: 'Atuando desde', value: '2023' },
  { label: 'Registro', value: 'CREFITO 375039-F' },
]

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  {
    src: '/galeria/espaco-cadillac-reformer.webp',
    alt: 'Estúdio — Cadillac e Reformer',
  },
  {
    src: '/galeria/espaco-biombos.webp',
    alt: 'Estúdio — Área com biombos',
  },
  {
    src: '/galeria/espaco-sala-espelho.webp',
    alt: 'Estúdio — Sala com espelho',
  },
  {
    src: '/galeria/espaco-visao-geral.webp',
    alt: 'Estúdio — Visão geral',
  },
  {
    src: '/galeria/espaco-panoramica.webp',
    alt: 'Estúdio — Vista panorâmica',
  },
]
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/
git commit -m "feat: add constants and data layer"
```

---

## Task 4: UI atoms — FadeUp, SectionTag, WhatsAppButton

**Files:**
- Create: `src/components/ui/FadeUp.tsx`
- Create: `src/components/ui/SectionTag.tsx`
- Create: `src/components/ui/WhatsAppButton.tsx`

- [ ] **Step 1: Create src/components/ui/FadeUp.tsx**

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create src/components/ui/SectionTag.tsx**

```tsx
interface SectionTagProps {
  children: React.ReactNode
  className?: string
}

export function SectionTag({ children, className = '' }: SectionTagProps) {
  return (
    <span
      className={`inline-block text-xs font-body font-medium tracking-widest uppercase text-salvia px-3 py-1 rounded-pill border border-salvia/30 bg-salvia/10 ${className}`}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Create src/components/ui/WhatsAppButton.tsx**

```tsx
import { WHATSAPP_URL } from '@/lib/constants'

interface WhatsAppButtonProps {
  label?: string
  className?: string
  variant?: 'primary' | 'outline'
}

export function WhatsAppButton({
  label = 'Agendar avaliação no WhatsApp',
  className = '',
  variant = 'primary',
}: WhatsAppButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-pill font-body font-medium text-sm transition-all duration-200 min-h-[48px] cursor-pointer'

  const variants = {
    primary: 'bg-salvia text-white hover:bg-salvia/90 shadow-warm',
    outline:
      'border-2 border-salvia text-salvia hover:bg-salvia hover:text-white',
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {label}
    </a>
  )
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add FadeUp, SectionTag, and WhatsAppButton UI atoms"
```

---

## Task 5: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create src/components/layout/Navbar.tsx**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-linho/95 backdrop-blur-md shadow-warm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="#inicio" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-borda">
            <Image
              src="/logo-geovana.jpg"
              alt="Geovana Kohut"
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-normal text-pedra">
              Geovana Kohut
            </p>
            <p className="font-body text-[10px] text-casca tracking-wide">
              Fisioterapia e Pilates
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-casca hover:text-salvia transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-salvia text-white text-sm font-body font-medium rounded-pill hover:bg-salvia/90 transition-colors duration-200 min-h-[44px]"
        >
          Agendar avaliação
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            className={`block w-5 h-0.5 bg-pedra transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-pedra transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-pedra transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-linho/98 backdrop-blur-md border-t border-borda px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-base text-pedra hover:text-salvia transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-salvia text-white text-sm font-body font-medium rounded-pill hover:bg-salvia/90 transition-colors min-h-[48px]"
          >
            Agendar avaliação
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with scroll behavior and mobile menu"
```

---

## Task 6: Footer and MobileCta

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/MobileCta.tsx`

- [ ] **Step 1: Create src/components/layout/Footer.tsx**

```tsx
import Link from 'next/link'
import { WHATSAPP_URL, INSTAGRAM_URL, CREFITO } from '@/lib/constants'

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-pedra text-white/70 py-10 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body">
        <p className="font-display text-white text-base">Geovana Kohut</p>

        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @kohut.fisiopilates
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="text-center md:text-right">
          <p>{CREFITO}</p>
          <p className="text-white/40 text-xs mt-1">
            © {new Date().getFullYear()} Geovana Kohut Fisioterapia e Pilates
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create src/components/layout/MobileCta.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/constants'

export function MobileCta() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const el = document.getElementById('footer')
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>

      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="bg-linho border-t border-borda px-4 py-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-salvia text-white text-sm font-body font-medium rounded-pill hover:bg-salvia/90 transition-colors min-h-[48px]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Agendar avaliação no WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Footer and sticky MobileCta"
```

---

## Task 7: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create src/components/sections/HeroSection.tsx**

```tsx
import Image from 'next/image'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

const trustItems = [
  'Atendimento 100% individualizado',
  'Profissional com formação clínica e em Pilates',
  'Sessões adaptadas ao seu ritmo e objetivos',
]

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen">
      {/* ── Desktop layout ── */}
      <div className="hidden md:grid md:grid-cols-2 min-h-screen">
        {/* Left: photo */}
        <div className="relative">
          <Image
            src="/profissional.webp"
            alt="Geovana Kohut, fisioterapeuta e instrutora de Pilates"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
        </div>

        {/* Right: content */}
        <div className="flex items-center bg-white px-12 xl:px-16 py-20">
          <div className="max-w-md">
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-salvia mb-6">
              Pilates terapêutico e fisioterapia em Campo Mourão - PR
            </span>

            <h1
              className="font-display font-light text-pedra leading-tight mb-6"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 3.2rem)' }}
            >
              Alívio de dores e melhora da postura com{' '}
              <em className="italic">cuidado individual</em>
            </h1>

            <p className="font-body text-casca text-base leading-relaxed mb-8">
              Um atendimento acolhedor onde você aprende a se movimentar com
              segurança — com um plano adaptado às suas necessidades e
              objetivos.
            </p>

            <ul className="space-y-3 mb-10">
              {trustItems.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-pedra">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-salvia flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <WhatsAppButton />
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Photo with gradient overlay */}
        <div className="relative" style={{ height: '55vh' }}>
          <Image
            src="/profissional.webp"
            alt="Geovana Kohut, fisioterapeuta e instrutora de Pilates"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pedra/70" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1
              className="font-display font-light text-white leading-tight"
              style={{ fontSize: 'clamp(1.85rem, 7vw, 2.5rem)' }}
            >
              Alívio de dores e melhora da postura com{' '}
              <em className="italic">cuidado individual</em>
            </h1>
          </div>
        </div>

        {/* Content card */}
        <div className="flex-1 bg-linho px-6 py-8 flex flex-col gap-6">
          <p className="font-body text-casca text-sm leading-relaxed">
            Um atendimento acolhedor onde você aprende a se movimentar com
            segurança — com um plano adaptado às suas necessidades e objetivos.
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-2">
            {trustItems.map((item) => (
              <span
                key={item}
                className="text-xs font-body text-casca px-3 py-1.5 rounded-pill border border-borda bg-white"
              >
                {item}
              </span>
            ))}
          </div>

          <WhatsAppButton className="w-full" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection with responsive desktop/mobile layouts"
```

---

## Task 8: AboutSection

**Files:**
- Create: `src/components/sections/AboutSection.tsx`

- [ ] **Step 1: Create src/components/sections/AboutSection.tsx**

```tsx
import Image from 'next/image'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { credentials } from '@/lib/data'

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <FadeUp>
            <div className="relative aspect-[3/4] rounded-card overflow-hidden shadow-warm-lg max-w-sm mx-auto md:mx-0">
              <Image
                src="/kohut-pro.webp"
                alt="Geovana Kohut"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </FadeUp>

          {/* Content */}
          <FadeUp delay={0.1}>
            <SectionTag className="mb-5">Sobre</SectionTag>

            <h2 className="font-display font-light text-pedra leading-tight mb-6 text-4xl md:text-5xl">
              Sou Geovana Kohut, fisioterapeuta e instrutora de Pilates.
            </h2>

            <p className="font-body text-casca leading-relaxed mb-6">
              Atuo desde 2023 unindo a fisioterapia clínica ao Pilates
              terapêutico para oferecer um cuidado completo e individualizado.
              Cada sessão é pensada para o seu corpo, seu histórico e seus
              objetivos.
            </p>

            <blockquote className="font-display italic text-xl text-salvia border-l-2 border-salvia pl-5 mb-8 leading-snug">
              "Movimento com propósito transforma não só o corpo — transforma
              como você se sente em cada momento do dia."
            </blockquote>

            {/* Credentials grid */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  className="bg-linho rounded-card p-4 border border-borda"
                >
                  <p className="font-body text-xs text-casca uppercase tracking-wider mb-1">
                    {cred.label}
                  </p>
                  <p className="font-body text-sm font-medium text-pedra">
                    {cred.value}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "feat: add AboutSection with credentials grid"
```

---

## Task 9: ServicesSection

**Files:**
- Create: `src/components/sections/ServicesSection.tsx`

- [ ] **Step 1: Create src/components/sections/ServicesSection.tsx**

```tsx
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { serviceGroups } from '@/lib/data'

const groupColors: Record<string, string> = {
  'Pilates Terapêutico': 'bg-salvia/10 text-salvia border-salvia/20',
  Fisioterapia: 'bg-casca/10 text-casca border-casca/20',
}

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 md:py-28 bg-linho">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <SectionTag className="mb-4">Para quem é</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Como posso te ajudar
            </h2>
          </div>
        </FadeUp>

        <div className="space-y-12">
          {serviceGroups.map((group, gi) => (
            <FadeUp key={group.label} delay={gi * 0.1}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`font-body text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-pill border ${groupColors[group.label] ?? 'bg-salvia/10 text-salvia border-salvia/20'}`}
                  >
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-borda" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.services.map((service) => (
                    <div
                      key={service.title}
                      className="bg-white rounded-card p-5 border border-borda shadow-warm hover:shadow-warm-lg transition-shadow duration-200"
                    >
                      <h3 className="font-body font-medium text-pedra text-base mb-2">
                        {service.title}
                      </h3>
                      <p className="font-body text-casca text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ServicesSection.tsx
git commit -m "feat: add ServicesSection with two service groups"
```

---

## Task 10: HowItWorksSection

**Files:**
- Create: `src/components/sections/HowItWorksSection.tsx`

- [ ] **Step 1: Create src/components/sections/HowItWorksSection.tsx**

```tsx
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'

const steps = [
  {
    number: '01',
    title: 'Avaliação inicial',
    description:
      'Uma conversa sobre suas dores, histórico de saúde e objetivos. Faço uma análise postural e de movimento para entender o seu corpo.',
  },
  {
    number: '02',
    title: 'Plano personalizado',
    description:
      'Com base na avaliação, crio um plano de exercícios adaptado ao seu ritmo — respeitando seus limites e avançando no seu tempo.',
  },
  {
    number: '03',
    title: 'Acompanhamento contínuo',
    description:
      'Ajusto o plano conforme você evolui. O objetivo é que você sinta melhora real e aprenda a cuidar do seu corpo a longo prazo.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <SectionTag className="mb-4">Como funciona</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Três passos para começar
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.12}>
              <div className="text-center md:text-left">
                <p className="font-display text-6xl font-light text-salvia/30 leading-none mb-4">
                  {step.number}
                </p>
                <h3 className="font-body font-medium text-pedra text-lg mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-casca text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HowItWorksSection.tsx
git commit -m "feat: add HowItWorksSection with 3 numbered steps"
```

---

## Task 11: CtaBannerSection

**Files:**
- Create: `src/components/sections/CtaBannerSection.tsx`

- [ ] **Step 1: Create src/components/sections/CtaBannerSection.tsx**

```tsx
import { WHATSAPP_URL } from '@/lib/constants'

export function CtaBannerSection() {
  return (
    <section className="bg-salvia py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-light text-white text-3xl md:text-4xl mb-6 leading-snug">
          Quer começar com orientação individual?
        </h2>
        <p className="font-body text-white/80 text-base mb-8">
          Agende sua avaliação pelo WhatsApp e dê o primeiro passo para se
          movimentar com mais segurança e bem-estar.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-salvia text-sm font-body font-medium rounded-pill hover:bg-white/90 transition-colors min-h-[48px]"
        >
          Agendar avaliação no WhatsApp
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CtaBannerSection.tsx
git commit -m "feat: add CtaBannerSection"
```

---

## Task 12: TestimonialsSection

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Create src/components/sections/TestimonialsSection.tsx**

```tsx
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { testimonials } from '@/lib/data'

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-linho">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionTag className="mb-4">Depoimentos</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              O que dizem as pacientes
            </h2>
          </div>
        </FadeUp>

        {/* Mobile: horizontal scroll snap */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 w-[80vw] bg-white rounded-card p-6 border border-borda shadow-warm"
              style={{ scrollSnapAlign: 'start' }}
            >
              <p className="font-display italic text-lg text-pedra leading-relaxed mb-4">
                "{t.text}"
              </p>
              <p className="font-body text-sm font-medium text-casca">
                — {t.name}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: grid — row 1: 2 cols, row 2: 3 cols */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-5 mb-5">
            {testimonials.slice(0, 2).map((t) => (
              <FadeUp key={t.name}>
                <div className="bg-white rounded-card p-7 border border-borda shadow-warm h-full">
                  <p className="font-display italic text-xl text-pedra leading-relaxed mb-5">
                    "{t.text}"
                  </p>
                  <p className="font-body text-sm font-medium text-casca">
                    — {t.name}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-5">
            {testimonials.slice(2).map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.08}>
                <div className="bg-white rounded-card p-6 border border-borda shadow-warm h-full">
                  <p className="font-display italic text-lg text-pedra leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                  <p className="font-body text-sm font-medium text-casca">
                    — {t.name}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx
git commit -m "feat: add TestimonialsSection with desktop grid and mobile scroll snap"
```

---

## Task 13: GallerySection

**Files:**
- Create: `src/components/sections/GallerySection.tsx`

- [ ] **Step 1: Create src/components/sections/GallerySection.tsx**

```tsx
import Image from 'next/image'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { galleryImages } from '@/lib/data'

export function GallerySection() {
  const [main, ...rest] = galleryImages

  return (
    <section id="galeria" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionTag className="mb-4">Espaço</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Conheça o estúdio
            </h2>
          </div>
        </FadeUp>

        {/* Mobile: horizontal scroll */}
        <div
          className="md:hidden flex gap-3 overflow-x-auto pb-3"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="flex-shrink-0 w-[75vw] aspect-[4/3] rounded-card overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={450}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Desktop: masonry — large left + 2x2 right */}
        <FadeUp>
          <div className="hidden md:grid grid-cols-2 gap-4 h-[600px]">
            {/* Large left image */}
            <div className="rounded-card overflow-hidden">
              <Image
                src={main.src}
                alt={main.alt}
                width={700}
                height={600}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>

            {/* 2x2 right grid */}
            <div className="grid grid-cols-2 gap-4">
              {rest.map((img) => (
                <div key={img.src} className="rounded-card overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={350}
                    height={290}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/GallerySection.tsx
git commit -m "feat: add GallerySection with masonry desktop and mobile scroll"
```

---

## Task 14: FaqSection

**Files:**
- Create: `src/components/sections/FaqSection.tsx`

- [ ] **Step 1: Create src/components/sections/FaqSection.tsx**

```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { faqs } from '@/lib/data'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-20 md:py-28 bg-linho">
      <div className="max-w-2xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionTag className="mb-4">Dúvidas</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Perguntas frequentes
            </h2>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={faq.question} delay={i * 0.06}>
              <div className="bg-white rounded-card border border-borda overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer min-h-[56px]"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-body font-medium text-pedra text-sm pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-salvia"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-casca text-sm leading-relaxed px-6 pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FaqSection.tsx
git commit -m "feat: add FaqSection accordion with Framer Motion"
```

---

## Task 15: ContactSection

**Files:**
- Create: `src/components/sections/ContactSection.tsx`

- [ ] **Step 1: Create src/components/sections/ContactSection.tsx**

```tsx
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ADDRESS, HOURS, MAPS_URL } from '@/lib/constants'

export function ContactSection() {
  return (
    <section id="contato" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionTag className="mb-4">Contato</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Vamos conversar?
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-lg mx-auto bg-linho rounded-card border border-borda p-8 md:p-10 text-center space-y-6">
            <div>
              <p className="font-body text-xs text-casca uppercase tracking-wider mb-1">
                Endereço
              </p>
              <p className="font-body text-pedra text-sm">{ADDRESS}</p>
            </div>

            <div className="h-px bg-borda" />

            <div>
              <p className="font-body text-xs text-casca uppercase tracking-wider mb-1">
                Horário de atendimento
              </p>
              <p className="font-body text-pedra text-sm">{HOURS}</p>
            </div>

            <div className="h-px bg-borda" />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <WhatsAppButton className="w-full sm:w-auto" />

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-pill border-2 border-pedra/20 text-pedra text-sm font-body font-medium hover:border-pedra/40 transition-colors min-h-[48px] w-full sm:w-auto"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Ver no Google Maps
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ContactSection.tsx
git commit -m "feat: add ContactSection with address, hours, and action buttons"
```

---

## Task 16: app/page.tsx — page composition

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx**

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileCta } from '@/components/layout/MobileCta'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { CtaBannerSection } from '@/components/sections/CtaBannerSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <HowItWorksSection />
        <CtaBannerSection />
        <TestimonialsSection />
        <GallerySection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
```

- [ ] **Step 2: Run full build to catch all type errors**

```bash
npm run build
```

Expected: `✓ Compiled successfully` — zero TypeScript errors and zero build warnings.

- [ ] **Step 3: Start dev server and do visual check**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- All sections render in order
- Navbar is fixed and transparent at top
- Hero shows on both desktop and mobile (use browser DevTools to test mobile)
- Scroll triggers blur on Navbar
- Gallery and testimonials scroll on mobile

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose full landing page in app/page.tsx"
```

---

## Task 17: OG Image and Sitemap

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/sitemap.ts`
- Create: `next-sitemap.config.js`

- [ ] **Step 1: Create src/app/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Geovana Kohut Fisioterapia e Pilates em Campo Mourão'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F4EFE6',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 80,
        }}
      >
        <p
          style={{
            fontSize: 18,
            color: '#6B8F71',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Pilates terapêutico e fisioterapia — Campo Mourão, PR
        </p>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 300,
            color: '#3D3635',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Geovana Kohut
        </h1>
        <p
          style={{
            fontSize: 24,
            color: '#7A6458',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Fisioterapia e Pilates com cuidado individual
        </p>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 2: Create src/app/sitemap.ts**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kohutfisiopilates.com.br',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

- [ ] **Step 3: Create next-sitemap.config.js**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kohutfisiopilates.com.br',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 1,
}
```

- [ ] **Step 4: Add postbuild script to package.json**

In `package.json`, update the `scripts` section:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "postbuild": "next-sitemap",
  "start": "next start"
}
```

- [ ] **Step 5: Verify build generates sitemap**

```bash
npm run build
```

Expected: `✓ Compiled successfully` + `next-sitemap: Generated sitemap` output. Files `public/sitemap.xml` and `public/robots.txt` should appear.

- [ ] **Step 6: Commit**

```bash
git add src/app/opengraph-image.tsx src/app/sitemap.ts next-sitemap.config.js package.json public/sitemap.xml public/robots.txt
git commit -m "feat: add OG image, sitemap.ts, and next-sitemap postbuild"
```

---

## Task 18: Final verification

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected: Clean build with zero errors. All routes listed in build output.

- [ ] **Step 2: Run production server and do final check**

```bash
npm run start
```

Open http://localhost:3000 and verify:
- Navbar: transparent → blur on scroll; hamburger menu opens/closes on mobile
- Hero: desktop split layout; mobile immersive photo with gradient + content card
- About: photo left, content right; credentials grid renders
- Services: two labeled groups with cards
- How it Works: three numbered steps
- CTA Banner: sage green background, white button
- Testimonials: desktop 2+3 grid; mobile horizontal scroll snap
- Gallery: desktop masonry; mobile horizontal scroll snap
- FAQ: all four items open/close smoothly
- Contact: address, hours, WhatsApp and Maps buttons
- Footer: dark background, links and CREFITO
- Mobile CTA: sticky bar visible on mobile, hides when footer is visible
- No layout shift on scroll
- No console errors

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Kohut landing page — all sections, SEO, and sitemap"
```

---

## Notes for the implementer

**Images:** All image files listed at the top of this plan must be placed in `public/` before running the dev server. Without them, Next.js `<Image>` will throw 404 errors. Use any placeholder images temporarily if the real ones aren't available yet.

**Placeholder images during dev:** Create a placeholder so `next/image` doesn't error:
```bash
# Quick placeholder — copy any existing image from public/ to the expected paths, or:
mkdir -p public/galeria
# Then place your actual .webp files at the listed paths
```

**Tailwind v4 class names:** The custom tokens defined in `@theme` (e.g. `--color-salvia`) become utility classes like `bg-salvia`, `text-salvia`, `border-salvia`. If a class isn't being applied, verify the token name matches exactly.

**`font-display` / `font-body`:** These Tailwind utilities map to `--font-display` and `--font-body` in `@theme`, which in turn reference the CSS variables injected by `next/font` (`--font-cormorant`, `--font-dm-sans`).
