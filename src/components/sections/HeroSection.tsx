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
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-2 min-h-screen">
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
              segurança — com um plano adaptado às suas necessidades e objetivos.
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

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col min-h-screen">
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
        <div className="flex-1 bg-linho px-6 py-8 flex flex-col gap-6">
          <p className="font-body text-casca text-sm leading-relaxed">
            Um atendimento acolhedor onde você aprende a se movimentar com
            segurança — com um plano adaptado às suas necessidades e objetivos.
          </p>
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
