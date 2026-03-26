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

export const credentials: Credential[] = [
  { label: 'Formação', value: 'Fisioterapia — Unespar' },
  { label: 'Especialização', value: 'Pilates Terapêutico' },
  { label: 'Atuando desde', value: '2023' },
  { label: 'Registro', value: 'CREFITO 375039-F' },
]

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
