# SEO Action Plan — kohutfisiopilates.com
**Gerado em:** 28 de abril de 2026  
**Score atual:** 67/100  
**Score potencial após implementação:** 84/100

---

## CRÍTICO — Corrigir Imediatamente

### C1. Resolver BAILOUT_TO_CLIENT_SIDE_RENDERING

**Problema:** O componente `FadeUp` (`src/components/ui/FadeUp.tsx`) usa `'use client'` + Framer Motion `useInView`, envolvendo todas as seções da página. Isso faz o Next.js App Router emitir `BAILOUT_TO_CLIENT_SIDE_RENDERING`, fazendo o HTML estático mostrar corpo de página 404 em vez do conteúdo real.

**Solução recomendada:** Substituir `FadeUp` por uma implementação que não cause bailout — usando CSS animation com Intersection Observer via `'use client'` somente no wrapper de animação, mantendo o conteúdo renderizável no servidor.

Opção mais simples: **remover o `FadeUp` dos componentes de seção** e usar CSS puro para animações de entrada, mantendo SSR completo:

```tsx
// src/components/ui/FadeUp.tsx — versão SSR-safe
'use client'
import { useEffect, useRef } from 'react'

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'none' } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease` }}
      className={className}
    >
      {children}
    </div>
  )
}
```

Alternativa: extrair os wrappers `FadeUp` para um Client Component separado que envolve cada seção, enquanto as seções em si permanecem como Server Components.

**Arquivo:** `src/components/ui/FadeUp.tsx`  
**Esforço:** 2–4 horas  
**Impacto SEO:** Alto (+8–12 pontos em Technical e Content)

---

### C2. Resolver Metatag `robots: noindex` Duplicada

**Problema:** O template 404 do Next.js injeta `<meta name="robots" content="noindex"/>` na resposta, coexistindo com o `index, follow` correto da página.

**Causa:** O bailout do CSR faz o Next.js renderizar o template `_not-found`, que inclui `noindex` como medida de segurança para páginas 404.

**Solução:** Resolver o C1 (BAILOUT) elimina automaticamente este problema, pois o template 404 deixa de ser renderizado no HTML estático da homepage.

**Esforço:** Resolvido ao implementar C1  
**Impacto SEO:** Crítico (risco de desindexação)

---

### C3. Adicionar Verificação do Google Search Console

**Problema:** O código em `src/app/layout.tsx` tem o seguinte comentário:
```typescript
// TODO: Substituir pelo codigo real do Google Search Console
// verification: {
//   google: 'SEU_CODIGO_REAL_AQUI',
// },
```

**Solução:** 
1. Acessar [Google Search Console](https://search.google.com/search-console)
2. Adicionar a propriedade `kohutfisiopilates.com`
3. Escolher verificação por metatag HTML
4. Descomentar e preencher o código em `src/app/layout.tsx`:

```typescript
verification: {
  google: 'CODIGO_REAL_AQUI',
},
```

**Arquivo:** `src/app/layout.tsx` (linhas 87–91)  
**Esforço:** 30 minutos  
**Impacto:** Acesso a dados reais de indexação, cliques, impressões e erros

---

## ALTO — Corrigir em até 1 semana

### H1. Adicionar Schema AggregateRating

**Problema:** O site tem 5 depoimentos mas nenhum schema de avaliação. AggregateRating adiciona estrelas ao resultado de busca (rich snippet), aumentando CTR significativamente.

**Solução:** Adicionar ao `schemaLocalBusiness` em `src/app/layout.tsx`:

```typescript
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '5.0',
  reviewCount: '32',  // usar número real de avaliações do Google
  bestRating: '5',
  worstRating: '1',
},
```

**Nota:** Usar o número real de avaliações do Google Meu Negócio. Não inventar.

**Arquivo:** `src/app/layout.tsx`  
**Esforço:** 30 minutos  
**Impacto:** Rich snippets de estrelas no SERP, CTR +15–35%

---

### H2. Configurar Cache de Longa Duração para Imagens Estáticas

**Problema:** Imagens WebP servidas com `Cache-Control: public, max-age=0, must-revalidate`. Cada visit revalida os assets.

**Solução:** Adicionar regras de cache no `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [ /* headers atuais */ ],
    },
    {
      source: '/(.*)\\.(webp|jpg|png|ico|svg)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ]
},
```

**Arquivo:** `next.config.ts`  
**Esforço:** 30 minutos  
**Impacto:** Performance (reduz requests de revalidação), melhor LCP em visitas repetidas

---

### H3. Melhorar Alt Texts das Imagens

**Problema:** Imagens do estúdio sem localidade, foto da profissional com alt text muito curto.

**Correções:**

| Arquivo | Alt Atual | Alt Novo |
|---------|-----------|----------|
| `AboutSection.tsx` | `"Geovana Kohut"` | `"Geovana Kohut, fisioterapeuta e instrutora de Pilates em Campo Mourão"` |
| `data.ts` — espaco-cadillac-reformer | `"Estúdio — Cadillac e Reformer"` | `"Estúdio de pilates em Campo Mourão — Cadillac e Reformer"` |
| `data.ts` — espaco-biombos | `"Estúdio — Área com biombos"` | `"Estúdio de pilates em Campo Mourão — área com biombos"` |
| `data.ts` — espaco-sala-espelho | `"Estúdio — Sala com espelho"` | `"Estúdio de fisioterapia e pilates em Campo Mourão — sala com espelho"` |
| `data.ts` — espaco-visao-geral | `"Estúdio — Visão geral"` | `"Estúdio Kohut Fisio Pilates em Campo Mourão — visão geral"` |
| `data.ts` — espaco-panoramica | `"Estúdio — Vista panorâmica"` | `"Estúdio Kohut Fisio Pilates em Campo Mourão — vista panorâmica"` |

**Arquivos:** `src/components/sections/AboutSection.tsx`, `src/lib/data.ts`  
**Esforço:** 15 minutos  
**Impacto:** Google Images, acessibilidade, reforço de keyword local

---

### H4. Corrigir campo `logo` no LocalBusiness Schema

**Problema:** O campo `logo` aponta para `kohut-pro.webp` (foto profissional). Deveria apontar para a imagem da marca/logo.

**Contexto:** Existe `logo-geovana.jpg` no `/public` mas está em JPEG e não é usado.

**Solução:**
1. Converter `logo-geovana.jpg` para WebP: `cwebp logo-geovana.jpg -o logo-geovana.webp`
2. No `src/app/layout.tsx`, atualizar o schema:
```typescript
logo: 'https://kohutfisiopilates.com/logo-geovana.webp',
image: 'https://kohutfisiopilates.com/kohut-pro.webp',
```

**Esforço:** 30 minutos  
**Impacto:** Knowledge Panel do Google mais preciso

---

### H5. Otimizar H2 das Seções para Keywords Locais

**Problema:** H2 "Como posso te ajudar" e "Vamos conversar?" não contêm keywords locais.

**Sugestões:**

| Seção | H2 Atual | H2 Sugerido |
|-------|----------|-------------|
| ServicesSection | "Como posso te ajudar" | "Pilates e Fisioterapia em Campo Mourão" |
| ContactSection | "Vamos conversar?" | "Agende em Campo Mourão" |

**Arquivos:** `src/components/sections/ServicesSection.tsx`, `src/components/sections/ContactSection.tsx`  
**Esforço:** 15 minutos  
**Impacto:** Reforço de keywords no conteúdo visível

---

## MÉDIO — Implementar em até 1 mês

### M1. Expandir llms.txt com FAQ e Preços

O `llms.txt` existe e está bem estruturado. Adicionar:

```markdown
## Perguntas Frequentes

**Nunca fiz pilates. Posso começar?**
Sim! O pilates terapêutico é indicado para todos os níveis. A avaliação inicial cria um plano seguro.

**Tenho dor nas costas. Pilates é indicado?**
Sim. O pilates terapêutico é uma das principais ferramentas para alívio de dores musculares e posturais.

[... demais FAQs ...]

## Faixa de Preço
Preço médio: $$  
Consultar valores via WhatsApp: +55 44 99834-3726
```

**Arquivo:** `public/llms.txt`  
**Esforço:** 30 minutos  
**Impacto:** Melhor citabilidade por ChatGPT, Perplexity, Google AI Overviews

---

### M2. Adicionar Regras de robots.txt para AI Crawlers

Para granularidade sobre AI crawlers (opcional — bloquear ou explicitamente permitir):

```
User-Agent: GPTBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: *
Allow: /
Sitemap: https://kohutfisiopilates.com/sitemap.xml
```

**Arquivo:** `src/app/robots.ts`  
**Esforço:** 15 minutos

---

### M3. Adicionar Content-Security-Policy Básico

```typescript
// Em next.config.ts, dentro do array de headers para source: '/(.*)'
{ 
  key: 'Content-Security-Policy', 
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none';"
}
```

**Arquivo:** `next.config.ts`  
**Esforço:** 1–2 horas (testar para não quebrar fontes e analytics)

---

### M4. Remover Imagens Não Utilizadas do Public

Duas imagens presentes em `/public` sem uso detectado:
- `public/geovana-pelve.webp` (35KB)
- `public/geovana-standing.webp` (32KB)

Verificar se são utilizadas em algum componente não auditado antes de remover.

**Esforço:** 15 minutos

---

### M5. Expandir Sitemap com Imagens

O sitemap atual tem apenas a URL. Para Google Images, adicionar dados de imagem:

```typescript
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kohutfisiopilates.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [
        'https://kohutfisiopilates.com/profissional.webp',
        'https://kohutfisiopilates.com/kohut-pro.webp',
        'https://kohutfisiopilates.com/galeria/espaco-cadillac-reformer.webp',
        'https://kohutfisiopilates.com/galeria/espaco-biombos.webp',
        'https://kohutfisiopilates.com/galeria/espaco-sala-espelho.webp',
        'https://kohutfisiopilates.com/galeria/espaco-visao-geral.webp',
        'https://kohutfisiopilates.com/galeria/espaco-panoramica.webp',
      ],
    },
  ]
}
```

**Arquivo:** `src/app/sitemap.ts`  
**Esforço:** 15 minutos

---

## BAIXO — Backlog

### L1. Converter logo-geovana.jpg para WebP

```bash
cwebp public/logo-geovana.jpg -o public/logo-geovana.webp
```

### L2. Comprimir imagens de galeria maiores

`espaco-biombos.webp` (138KB) e `espaco-panoramica.webp` (125KB) podem ser comprimidas para <80KB com qualidade preservada.

### L3. Considerar seção de blog ou artigos

Um blog com 4–6 artigos de 800+ palavras sobre "pilates para gestantes em Campo Mourão", "fisioterapia home care", etc. aumentaria significativamente o range de keywords cobertos e a autoridade topical. Impacto alto no longo prazo, mas esforço considerável.

### L4. Adicionar meta viewport aprimorada

Atual: `width=device-width, initial-scale=1`  
Sugerido: `width=device-width, initial-scale=1, viewport-fit=cover`  
(Para melhor exibição em dispositivos com notch/dynamic island)

### L5. Verificar e documentar avaliações no Google Meu Negócio

Garantir que o perfil GMB esteja reivindicado, com fotos, horários e categoria corretos antes de adicionar `aggregateRating` ao schema.

---

## Resumo Priorizado

| # | Ação | Esforço | Impacto | Prazo |
|---|------|---------|---------|-------|
| C1 | Corrigir BAILOUT_TO_CLIENT_SIDE_RENDERING | 2–4h | Alto | Imediato |
| C2 | (Resolvido com C1) | — | Crítico | Imediato |
| C3 | Verificar Google Search Console | 30min | Alto | Imediato |
| H1 | Adicionar AggregateRating schema | 30min | Alto | 1 semana |
| H2 | Cache de longa duração para imagens | 30min | Médio | 1 semana |
| H3 | Melhorar alt texts | 15min | Médio | 1 semana |
| H4 | Corrigir campo logo no schema | 30min | Baixo | 1 semana |
| H5 | Otimizar H2 para keywords locais | 15min | Médio | 1 semana |
| M1 | Expandir llms.txt com FAQ | 30min | Médio | 1 mês |
| M2 | Regras de robots.txt para AI | 15min | Baixo | 1 mês |
| M3 | Adicionar CSP header | 1–2h | Segurança | 1 mês |
| M4 | Remover imagens não usadas | 15min | Baixo | 1 mês |
| M5 | Expandir sitemap com imagens | 15min | Baixo | 1 mês |
