import Image from 'next/image'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { credentials } from '@/lib/data'

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeUp>
            <div className="relative aspect-[3/4] rounded-card overflow-hidden shadow-warm-lg max-w-sm mx-auto md:mx-0">
              <Image
                src="/kohut-pro.webp"
                alt="Geovana Kohut, fisioterapeuta e instrutora de pilates em Campo Mourão"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </FadeUp>
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
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-linho rounded-card p-4 border border-borda">
                  <p className="font-body text-xs text-casca uppercase tracking-wider mb-1">{cred.label}</p>
                  <p className="font-body text-sm font-medium text-pedra">{cred.value}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
