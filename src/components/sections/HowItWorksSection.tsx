import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'

const steps = [
  {
    number: '01',
    title: 'Avaliação inicial',
    description: 'Uma conversa sobre suas dores, histórico de saúde e objetivos. Faço uma análise postural e de movimento para entender o seu corpo.',
  },
  {
    number: '02',
    title: 'Plano personalizado',
    description: 'Com base na avaliação, crio um plano de exercícios adaptado ao seu ritmo — respeitando seus limites e avançando no seu tempo.',
  },
  {
    number: '03',
    title: 'Acompanhamento contínuo',
    description: 'Ajusto o plano conforme você evolui. O objetivo é que você sinta melhora real e aprenda a cuidar do seu corpo a longo prazo.',
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
                <p className="font-display text-6xl font-light text-salvia/30 leading-none mb-4">{step.number}</p>
                <h3 className="font-body font-medium text-pedra text-lg mb-3">{step.title}</h3>
                <p className="font-body text-casca text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
