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
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-body text-sm font-medium text-casca">— {t.name}</p>
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
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="font-body text-sm font-medium text-casca">— {t.name}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-5">
            {testimonials.slice(2).map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.08}>
                <div className="bg-white rounded-card p-6 border border-borda shadow-warm h-full">
                  <p className="font-display italic text-lg text-pedra leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="font-body text-sm font-medium text-casca">— {t.name}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
