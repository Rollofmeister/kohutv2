import { WHATSAPP_URL } from '@/lib/constants'

export function CtaBannerSection() {
  return (
    <section className="bg-salvia py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-light text-white text-3xl md:text-4xl mb-6 leading-snug">
          Quer começar com orientação individual?
        </h2>
        <p className="font-body text-white/80 text-base mb-8">
          Agende sua avaliação pelo WhatsApp e dê o primeiro passo para se
          movimentar com mais segurança e bem-estar.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-salvia text-sm font-body font-medium rounded-pill hover:bg-white/90 transition-colors min-h-[48px]"
        >
          Agendar avaliação no WhatsApp
        </a>
      </div>
    </section>
  )
}
