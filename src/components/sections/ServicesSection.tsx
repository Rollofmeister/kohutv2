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
              Pilates e Fisioterapia em Campo Mourão
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
