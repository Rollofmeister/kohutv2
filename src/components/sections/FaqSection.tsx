'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { faqs } from '@/lib/data'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-20 md:py-28 bg-linho">
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
              <div className="bg-white rounded-card border border-borda overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer min-h-[56px]"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-body font-medium text-pedra text-sm pr-4">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-salvia"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-casca text-sm leading-relaxed px-6 pb-5">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
