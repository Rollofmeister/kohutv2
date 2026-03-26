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
              <p className="font-body text-xs text-casca uppercase tracking-wider mb-1">Endereço</p>
              <p className="font-body text-pedra text-sm">{ADDRESS}</p>
            </div>
            <div className="h-px bg-borda" />
            <div>
              <p className="font-body text-xs text-casca uppercase tracking-wider mb-1">Horário de atendimento</p>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
