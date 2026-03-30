import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { faqs } from '@/lib/data'

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-linho">
      <div className="max-w-2xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionTag className="mb-4">Dúvidas</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Perguntas frequentes
            </h2>
          </div>
        </FadeUp>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={faq.question} delay={i * 0.06}>
              <details className="group bg-white rounded-card border border-borda overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none min-h-[56px] [&::-webkit-details-marker]:hidden">
                  <span className="font-body font-medium text-pedra text-sm pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-salvia transition-transform duration-200 group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-casca text-sm leading-relaxed px-6 pb-5">
                  {faq.answer}
                </p>
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
