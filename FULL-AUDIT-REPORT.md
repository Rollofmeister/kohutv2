# SEO Audit — kohutfisiopilates.com
**Data:** 28 de abril de 2026  
**Auditoria por:** Claude Code (seo-audit)

---

## Sumário Executivo

**SEO Health Score: 67/100**

| Categoria | Peso | Pontuação | Contribuição |
|-----------|------|-----------|--------------|
| Technical SEO | 22% | 58/100 | 12.8 |
| Content Quality | 23% | 65/100 | 14.9 |
| On-Page SEO | 20% | 70/100 | 14.0 |
| Schema / Structured Data | 10% | 80/100 | 8.0 |
| Performance (CWV) | 10% | 68/100 | 6.8 |
| AI Search Readiness | 10% | 65/100 | 6.5 |
| Images | 5% | 75/100 | 3.75 |
| **Total** | **100%** | **67/100** | |

**Tipo de negócio detectado:** Local Service — Clínica de Saúde (Fisioterapia + Pilates), atendimento presencial e home care, Campo Mourão - PR.

**Stack:** Next.js 16.2.1 (App Router), hospedado na Vercel, uma única página (single-page website).

### Top 5 Problemas Críticos
1. **BAILOUT_TO_CLIENT_SIDE_RENDERING** — o HTML estático servido aos crawlers contém corpo de página 404, não o conteúdo real do site
2. **Duas metatags `robots` conflitantes** — `noindex` (do template 404) coexiste com `index, follow` no mesmo HTML
3. **Google Search Console não verificado** — TODO no código sem código real de verificação
4. **Cache-Control `max-age=0` em imagens estáticas** — nenhum cache de longa duração para ativos WebP
5. **Ausência de AggregateRating** — depoimentos presentes no site mas sem schema de avaliação agregada

### Top 5 Quick Wins
1. Resolver o BAILOUT removendo `FadeUp` das seções ou usando alternativa SSR-compatible
2. Adicionar verificação do Google Search Console
3. Configurar `Cache-Control: public, max-age=31536000, immutable` para imagens estáticas
4. Adicionar schema `AggregateRating` com nota dos pacientes
5. Melhorar alt text de `kohut-pro.webp` de "Geovana Kohut" para "Geovana Kohut, fisioterapeuta em Campo Mourão"

---

## 1. Technical SEO

### 1.1 Crawlabilidade e Indexabilidade

| Item | Status | Detalhe |
|------|--------|---------|
| HTTPS | ✅ | Certificado válido, HSTS ativado (max-age=63072000) |
| HTTP/2 | ✅ | Confirmado via headers |
| robots.txt | ✅ | `Allow: /` para todos os user-agents, sitemap referenciado |
| sitemap.xml | ⚠️ | Válido, mas contém apenas 1 URL (homepage) |
| Canonical | ✅ | `https://kohutfisiopilates.com` definido corretamente |
| Redirecionamentos | ✅ | Sem loops detectados |
| Vercel CDN | ✅ | `x-vercel-cache: HIT` confirmado |

### 1.2 BAILOUT_TO_CLIENT_SIDE_RENDERING — CRÍTICO

O HTML estático retornado para crawlers contém **duas anomalias graves**:

**Problema 1 — Corpo de página 404 no HTML estático:**
```html
<h1 class="next-error-h1">404</h1>
<h2>This page could not be found.</h2>
```
Este conteúdo aparece no `<body>` do HTML que crawlers (e AI crawlers sem JS) veem. O status HTTP é 200, os metadados são corretos, mas o **conteúdo real** (HeroSection, AboutSection, ServicesSection etc.) **não está no HTML estático** — só renderiza após execução de JavaScript.

**Causa raiz:** Todos os componentes de seção estão envolvidos em `<FadeUp>`, que é `'use client'` e usa `useInView` do Framer Motion. Isso força o Next.js App Router a emitir `BAILOUT_TO_CLIENT_SIDE_RENDERING`, eliminando o SSR do conteúdo principal.

**Problema 2 — Duas metatags robots conflitantes:**
```html
<meta name="robots" content="noindex"/>          <!-- do template 404 -->
<meta name="robots" content="index, follow"/>    <!-- configuração real -->
```
O Google usa a diretiva mais restritiva quando há conflito — o `noindex` pode prevalecer, impedindo a indexação.

**Impacto:** H1, H2, H3, parágrafos, depoimentos e serviços **invisíveis** para crawlers sem JS. Googlebot renderiza JS, mas com delay. Outros crawlers (AI, Bing, etc.) podem não ver o conteúdo.

### 1.3 Segurança (Headers HTTP)

| Header | Status | Valor |
|--------|--------|-------|
| Strict-Transport-Security | ✅ | max-age=63072000 |
| X-Content-Type-Options | ✅ | nosniff |
| X-Frame-Options | ✅ | SAMEORIGIN |
| Referrer-Policy | ✅ | strict-origin-when-cross-origin |
| Permissions-Policy | ✅ | camera=(), microphone=(), geolocation=() |
| Content-Security-Policy | ❌ | Ausente |

**CSP ausente** representa risco de XSS. Para um site Next.js sem formulários dinâmicos ou conteúdo de terceiros, um CSP básico seria suficiente.

### 1.4 Cache de Ativos Estáticos

Imagens WebP servidas com `Cache-Control: public, max-age=0, must-revalidate` — os navegadores precisam revalidar a cada visita. Para imagens estáticas (que mudam raramente), o ideal é `max-age=31536000, immutable`.

---

## 2. Content Quality

### 2.1 Estrutura de Conteúdo

| Elemento | Status | Detalhe |
|----------|--------|---------|
| Idioma declarado | ✅ | `lang="pt-BR"` no `<html>` |
| H1 | ✅ | "Alívio de dores e melhora da postura com cuidado individual" |
| H2 presentes | ✅ | Multiple (Sobre, Como posso te ajudar, Vamos conversar?) |
| H3 presentes | ✅ | Cards de serviços (Dores em geral, Gestantes, Idosos, etc.) |
| Depoimentos | ✅ | 5 depoimentos de pacientes |
| FAQ | ✅ | 6 perguntas e respostas relevantes |
| Galeria | ✅ | 5 imagens do estúdio |
| Blog / Artigos | ❌ | Ausente |

### 2.2 E-E-A-T (Experiência, Especialização, Autoridade, Confiabilidade)

**Pontos fortes:**
- CREFITO 375039-F mencionado no meta title, meta description e schema
- Formação acadêmica (Unespar) mencionada
- Ano de atuação informado (desde 2023)
- Endereço físico completo com CEP
- Telefone e e-mail profissional verificáveis

**Lacunas:**
- Sem artigos ou conteúdo educativo que demonstre expertise
- Sem menção a certificações específicas além de "Especialização em Pilates Terapêutico"
- Sem prêmios, publicações ou menções em mídia
- Depoimentos sem sobrenome completo ou localidade (dificultam verificação)

### 2.3 Otimização de Palavras-chave nos Headings

| Heading | Atual | Oportunidade |
|---------|-------|--------------|
| H2 About | "Sou Geovana Kohut, fisioterapeuta e instrutora de Pilates." | Já inclui keywords ✅ |
| H2 Services | "Como posso te ajudar" | "Pilates Terapêutico e Fisioterapia em Campo Mourão" |
| H2 HowItWorks | (não lido, presumido) | Incluir palavra-chave local |
| H2 Contact | "Vamos conversar?" | "Agende sua Fisioterapia ou Pilates em Campo Mourão" |

### 2.4 Conteúdo Thin / Duplicado

Sem duplicação detectada. O conteúdo é único para o negócio. O site é compacto (single-page) — não é thin content no sentido negativo, mas limita o ranking para múltiplas queries de cauda longa.

---

## 3. On-Page SEO

### 3.1 Title Tag

```
Fisioterapia e Pilates em Campo Mourão | Geovana Kohut
```
- **Comprimento:** 54 caracteres ✅ (recomendado: 50–60)
- **Keyword primária:** "fisioterapia Campo Mourão" — presente ✅
- **Keyword secundária:** "Pilates em Campo Mourão" — presente ✅
- **Marca:** "Geovana Kohut" — presente ✅

### 3.2 Meta Description

```
Fisioterapeuta em Campo Mourão - PR | CREFITO 375039-F. Pilates terapêutico individualizado, 
fisioterapia clínica, geriátrica e home care. Agende sua avaliação pelo WhatsApp.
```
- **Comprimento:** 172 caracteres ⚠️ (ideal: 150–160; pode ser truncado no SERP)
- **CTA:** "Agende sua avaliação pelo WhatsApp" ✅
- **Credencial:** CREFITO presente ✅
- **Keywords:** presentes ✅

### 3.3 Open Graph / Social

| Tag | Status | Valor |
|-----|--------|-------|
| og:title | ✅ | "Fisioterapia e Pilates em Campo Mourão \| Geovana Kohut" |
| og:description | ✅ | Específica, diferente da meta desc |
| og:image | ✅ | 1200×630 PNG via `/opengraph-image` |
| og:type | ✅ | website |
| og:locale | ✅ | pt_BR |
| twitter:card | ✅ | summary_large_image |

### 3.4 Google Search Console

O código de verificação está comentado no código com `// TODO: Substituir pelo codigo real do Google Search Console`. **GSC não está conectado**, impedindo monitoramento de performance, erros de indexação e dados de cliques/impressões.

---

## 4. Schema / Structured Data

### 4.1 Schemas Implementados

| Schema | Válido | Completude |
|--------|--------|------------|
| LocalBusiness + PhysicalTherapy + MedicalBusiness | ✅ | Alta |
| FAQPage (6 Q&As) | ✅ | Alta |
| Person (Geovana Kohut) | ✅ | Alta |
| WebSite | ✅ | Completo |

### 4.2 Análise do LocalBusiness Schema

**Excelente implementação** com:
- `@id` usando URL com fragmento (`#business`) ✅
- NAP completo (Nome, Endereço, Telefone) ✅
- GeoCoordinates ✅
- OpeningHoursSpecification (Seg-Sex 07:00–20:00) ✅
- priceRange, paymentAccepted ✅
- areaServed com cidade/estado/país ✅
- hasOfferCatalog com 6 serviços ✅
- sameAs: Instagram + Google Maps ✅

### 4.3 Lacunas no Schema

| Schema Ausente | Impacto | Prioridade |
|---------------|---------|------------|
| `AggregateRating` | Rich snippets de estrelas no SERP — alto valor visual | Alta |
| `Review` individual | Depoimentos estruturados para AI | Média |
| `ImageObject` | Contexto das imagens para Google Images | Baixa |

**Sobre o campo `logo`:** Atualmente aponta para `kohut-pro.webp` (foto profissional). O campo `logo` deveria referenciar a imagem da marca/logo, não a foto da profissional. O site tem `logo-geovana.jpg` no public folder, porém está em formato JPEG e não é referenciado em nenhum componente.

---

## 5. Performance

### 5.1 Recursos e Otimização

| Item | Status | Detalhe |
|------|--------|---------|
| Formato de imagem | ✅ | WebP (AVIF configurado no next.config) |
| Preload hero image | ✅ | `priority` no Next/Image |
| Font display: swap | ✅ | Cormorant Garamond e DM Sans |
| Vercel CDN / Edge Cache | ✅ | HIT confirmado |
| Analytics & SpeedInsights | ✅ | `@vercel/analytics` e `@vercel/speed-insights` |
| Cache imagens estáticas | ❌ | `max-age=0, must-revalidate` |

### 5.2 Tamanhos de Imagem

| Imagem | Tamanho | Avaliação |
|--------|---------|-----------|
| profissional.webp | 44KB | ✅ Ótimo |
| kohut-pro.webp | 40KB | ✅ Ótimo |
| logo-geovana.jpg | 35KB | ⚠️ JPEG — converter para WebP |
| galeria/espaco-cadillac-reformer.webp | 98KB | ✅ Aceitável |
| galeria/espaco-biombos.webp | 138KB | ⚠️ Alto para galeria |
| galeria/espaco-panoramica.webp | 125KB | ⚠️ Alto para galeria |
| galeria/espaco-sala-espelho.webp | 122KB | ⚠️ Alto para galeria |

### 5.3 Impacto do FadeUp no CWV

O componente `FadeUp` inicializa com `opacity: 0, y: 24` e anima para visível quando entra no viewport. Isso significa que **todo o conteúdo abaixo do hero começa invisível** e aparece durante o scroll. Isso pode causar:
- **LCP impactado**: se o elemento LCP estiver dentro de um `FadeUp`, o LCP ocorre após a animação
- **CLS**: a transição `y: 24 → y: 0` pode causar layout shifts se não otimizada
- **INP**: interações bloqueadas durante animações

---

## 6. AI Search Readiness

### 6.1 llms.txt

✅ **Presente em** `https://kohutfisiopilates.com/llms.txt`

Conteúdo bem estruturado com: descrição do negócio, lista de serviços, contato completo, credenciais. Boa base para citabilidade por AI.

**Melhorias possíveis:**
- Adicionar seção `## FAQ` com as 6 perguntas
- Adicionar `## Depoimentos` (anonimizados)
- Adicionar preços estimados

### 6.2 Citabilidade por AI

| Sinal | Status | Detalhe |
|-------|--------|---------|
| llms.txt | ✅ | Presente e estruturado |
| Schema estruturado | ✅ | 4 schemas bem implementados |
| CREFITO no conteúdo | ✅ | Credencial verificável citada |
| Conteúdo factual | ✅ | Endereço, horário, contato verificáveis |
| Conteúdo educativo | ❌ | Sem artigos ou guias para AI citar |
| Robots.txt para AI crawlers | ⚠️ | Não bloqueia (OK), mas sem regras específicas para GPTBot, Anthropic-AI, etc. |

---

## 7. Local SEO

### 7.1 NAP Consistency

| Elemento | No Site | No Schema | Consistente |
|----------|---------|-----------|-------------|
| Nome | Geovana Kohut Fisioterapia e Pilates | ✅ | ✅ |
| Endereço | Av. Jorge Walter, 2270, Centro, Campo Mourão - PR | ✅ | ✅ |
| Telefone | (44) 99834-3726 | +5544998343726 | ✅ |
| Horário | Segunda a Sexta, 07h–20h | Seg-Sex 07:00–20:00 | ✅ |

### 7.2 Google Business Profile

- Link `sameAs` aponta para `maps.app.goo.gl/4cabH2ZEFdgtaQs68` (link de compartilhamento, não URL canônica do GBP)
- Não é possível confirmar se o GBP está reivindicado e otimizado sem acesso às ferramentas do Google
- **Sem `aggregateRating`** no schema indica que as avaliações do Google não estão sendo espelhadas

### 7.3 Ausência de Horários Fim de Semana

Os `openingHoursSpecification` cobrem apenas Monday–Friday. Se o estúdio não atende Sab/Dom, está correto. Se atender, adicionar é importante para SEO local.

---

## 8. Images

| Imagem | Alt Text Atual | Avaliação |
|--------|--------------|-----------|
| profissional.webp (hero) | "Geovana Kohut, fisioterapeuta e instrutora de Pilates" | ✅ Excelente |
| kohut-pro.webp (about) | "Geovana Kohut" | ⚠️ Muito curto |
| espaco-cadillac-reformer.webp | "Estúdio — Cadillac e Reformer" | ⚠️ Sem localidade |
| espaco-biombos.webp | "Estúdio — Área com biombos" | ⚠️ Sem localidade |
| espaco-sala-espelho.webp | "Estúdio — Sala com espelho" | ⚠️ Sem localidade |
| espaco-visao-geral.webp | "Estúdio — Visão geral" | ⚠️ Sem localidade |
| espaco-panoramica.webp | "Estúdio — Vista panorâmica" | ⚠️ Sem localidade |

**Imagens não utilizadas detectadas:** `geovana-pelve.webp` e `geovana-standing.webp` estão no `/public` mas não aparecem em nenhum componente.

---

## Apêndice: Estrutura do Site

```
kohutfisiopilates.com/          (única URL, single-page website)
├── #inicio     — HeroSection
├── #sobre      — AboutSection
├── #servicos   — ServicesSection
├── #como-funciona — HowItWorksSection
├── (CTA Banner)
├── (Testimonials)
├── (Gallery)
├── #faq        — FaqSection
└── #contato    — ContactSection
```

**Sitemap:** 1 URL apenas (homepage)  
**Robots.txt:** Sem bloqueios  
**Total de páginas:** 1  
