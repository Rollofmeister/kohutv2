# Landing Page — Geovana Kohut Fisioterapia e Pilates

**Data:** 2026-03-23
**Projeto:** Landing page de conversão para estúdio solo de pilates terapêutico e fisioterapia
**Objetivo único:** Gerar agendamentos via WhatsApp

---

## Contexto

Página para Geovana Kohut, fisioterapeuta e instrutora de Pilates em Campo Mourão - PR. Público-alvo: mulheres brasileiras, 30–65 anos, buscando alívio de dores ou melhora de qualidade de vida. Tom: acolhedor, confiante, não clínico.

---

## Decisões de Design (sessão de brainstorming)

### Hero — Desktop
Split editorial: foto da profissional em coluna inteira à esquerda (aspect 3:4), painel de texto branco à direita com H1, subtítulo, trust list e CTA.

### Hero — Mobile
Foto imersiva ocupando ~55% da altura com título sobreposto (gradiente escuro na base), seguida de card de texto com subtítulo e CTA em largura total.

### Galeria
Seção dedicada com grid de fotos do espaço — entre Depoimentos e FAQ.

### Abordagem
Componentes por seção (Opção 2): cada seção é um componente isolado, conteúdo centralizado em `lib/data.ts`.

---

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **`next/font`** — Cormorant Garamond + DM Sans
- **Framer Motion** — animações fade-up no scroll
- **`next-sitemap`** — sitemap automático

---

## Tokens de Design

```css
--color-linho:  #F4EFE6  /* fundo */
--color-salvia: #6B8F71  /* acento, botões */
--color-pedra:  #3D3635  /* texto principal */
--color-casca:  #7A6458  /* subtexto */
--color-borda:  #EBE5DC  /* bordas e divisores */
```

**Tipografia:**
- Display/títulos: Cormorant Garamond 300–400, italic nos destaques
- Corpo/UI: DM Sans 300–500

**Bordas:** cards `1.2rem`, botões pill `9999px`
**Sombras:** `rgba(61,54,53,0.08)` (warm, sutil)
**Animações:** fade-up suave via Framer Motion `whileInView`

---

## Estrutura de Pastas

```
src/
  app/
    layout.tsx              ← fontes, metadata global
    page.tsx                ← composição das seções
    opengraph-image.tsx     ← OG image dinâmica
    sitemap.ts
  components/
    layout/
      Navbar.tsx            ← fixa, links, CTA desktop, hamburger mobile
      Footer.tsx
      MobileCta.tsx         ← sticky CTA mobile (oculto no footer)
    sections/
      HeroSection.tsx
      AboutSection.tsx
      ServicesSection.tsx
      HowItWorksSection.tsx
      CtaBannerSection.tsx
      TestimonialsSection.tsx
      GallerySection.tsx
      FaqSection.tsx
      ContactSection.tsx
    ui/
      WhatsAppButton.tsx    ← botão reutilizável com link WhatsApp
      SectionTag.tsx        ← chip de categoria
      FadeUp.tsx            ← wrapper de animação Framer Motion
  lib/
    data.ts                 ← depoimentos, FAQs, serviços, credenciais
    constants.ts            ← links WhatsApp, Maps, Instagram
```

---

## Seções da Página

### 1. Navbar (fixa)
- Logo (`/logo-geovana.jpg`) + "Geovana Kohut" / "Fisioterapia e Pilates"
- Links: Início | Serviços | Sobre | Galeria | Contato
- Botão CTA desktop: "Agendar avaliação" (pill sálvia)
- Menu hamburger no mobile (drawer lateral)
- Fundo transparente → linho com backdrop-blur no scroll

### 2. Hero
**Desktop:** grid 2 colunas — foto portrait `/profissional.webp` (col esquerda, h-full, object-cover) + painel branco (col direita) com:
- Tag pequena: "Pilates terapêutico e fisioterapia em Campo Mourão - PR"
- H1: "Alívio de dores e melhora da postura com *cuidado individual*"
- Subtítulo: atendimento acolhedor, movimentar com segurança, plano adaptado
- Trust list (3 bullets com dot sálvia)
- CTA pill sálvia: "Agendar avaliação no WhatsApp"

**Mobile:** foto `/profissional.webp` full-width (~55vh) com gradiente bottom + título sobreposto → card linho com subtítulo, trust chips e CTA 100% width.

### 3. Sobre (Quem sou eu)
- Foto `/kohut-pro.webp` + texto bio
- H2: "Sou Geovana Kohut, fisioterapeuta e instrutora de Pilates."
- Lead: atua desde 2023, une fisioterapia clínica e Pilates terapêutico
- Blockquote em Cormorant Garamond italic: citação de marca
- Grid de credenciais (4 itens): Formação | Especialização | Atuando desde | CREFITO 375039-F

### 4. Serviços (Para quem é)
- **Grupo 1 — Pilates Terapêutico:** Dores em geral | Gestantes | Idosos | Atletas
- **Grupo 2 — Fisioterapia:** Geriátrico | Home Care | Clínico Geral
- Cards com título, descrição curta e badge de categoria
- Dois grupos visuais distintos (sem tabs — mais simples, sem overhead de interatividade)

### 5. Como Funciona (3 passos)
1. Avaliação inicial — conversa sobre dores e objetivos
2. Plano personalizado — pilates no seu ritmo
3. Acompanhamento contínuo — ajustes conforme evolução
- Ícones minimalistas ou numerais grandes em Cormorant

### 6. CTA Banner Intermediário
- Fundo sálvia
- "Quer começar com orientação individual?"
- Botão branco com texto sálvia

### 7. Depoimentos
- 5 depoimentos reais: Jaqueline Kohut, Addlyz Karina, Jociane Rodrigues, Amanda Rodrigues, Fernanda Nunes
- Desktop: grid 3 colunas (linha 1: 2 cards, linha 2: 3 cards)
- Mobile: scroll horizontal com snap

### 8. Galeria
- 5 fotos: `/galeria/espaco-cadillac-reformer.webp`, `espaco-biombos.webp`, `espaco-sala-espelho.webp`, `espaco-visao-geral.webp`, `espaco-panoramica.webp`
- Desktop: layout masonry — 1 foto grande à esquerda + grid 2×2 à direita
- Mobile: scroll horizontal snap
- Hover: suave zoom (scale 1.03)

### 9. FAQ (Accordion)
- 4 perguntas principais:
  1. Nunca fiz pilates. Posso começar?
  2. Tenho dor para me movimentar. É indicado?
  3. Como funciona a primeira avaliação?
  4. A Geovana atende em casa em Campo Mourão?
- Animação suave de abertura via Framer Motion

### 10. Contato / Localização
- Endereço: Av. Jorge Walter, 2270 — Centro, Campo Mourão - PR
- Horário: Segunda a Sexta, 07h–20h
- Botão WhatsApp (pill sálvia) + Botão Google Maps (pill outline)
- Link direto para Google Maps (sem iframe — mais simples, sem implicações de privacidade)

### 11. Footer
- Nome + copyright
- Instagram @kohut.fisiopilates (link)
- WhatsApp link
- CREFITO 375039-F

---

## Mobile-First — Regras Obrigatórias

- `MobileCta.tsx`: botão sticky `position: fixed; bottom: 0` com `padding-bottom: env(safe-area-inset-bottom)`. Oculto via `IntersectionObserver` quando footer está visível.
- H1: `clamp(1.85rem, 5vw, 3.2rem)`
- Botões: `width: 100%` no mobile, pill em ambos
- Tap targets: mínimo 48px
- `touch-action: manipulation` em todos os interativos
- Depoimentos e galeria: `scroll-snap-type: x mandatory` no mobile

---

## SEO e Metadados

```ts
// app/layout.tsx
metadata = {
  title: "Geovana Kohut | Fisioterapia e Pilates em Campo Mourão",
  description: "Pilates terapêutico e fisioterapia com atendimento humanizado...",
  openGraph: { images: ["/opengraph-image"] },
  alternates: { canonical: "https://kohutfisiopilates.com.br" }
}
```

**Schema.org LocalBusiness:**
```json
{
  "@type": "LocalBusiness",
  "name": "Geovana Kohut Fisioterapia e Pilates",
  "address": "Av. Jorge Walter, 2270, Campo Mourão, PR, 87303-060",
  "telephone": "+5544998343726",
  "geo": { "latitude": -24.045, "longitude": -52.383 },
  "openingHours": "Mo-Fr 07:00-20:00"
}
```

---

## Links e Constantes

```ts
// lib/constants.ts
export const WHATSAPP_URL = "https://wa.me/5544998343726?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação%20de%20pilates"
export const MAPS_URL = "https://maps.app.goo.gl/4cabH2ZEFdgtaQs68"
export const INSTAGRAM_URL = "https://instagram.com/kohut.fisiopilates"
```

---

## O que NÃO fazer

- Sem cores vibrantes/neons — paleta toda quente e orgânica
- Sem layout clínico (branco frio + azul)
- Sem fotos de banco de imagem genéricas
- Sem texto em maiúsculo em excesso
- Sem gradientes purple/pink
- Sem ícones cartunizados ou emojis aleatórios
- Sem formulário de cadastro — conversão é 100% WhatsApp
