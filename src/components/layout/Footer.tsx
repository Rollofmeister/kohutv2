'use client'

import dynamic from 'next/dynamic'
import { WHATSAPP_URL, INSTAGRAM_URL, CREFITO } from '@/lib/constants'

const LSSignature = dynamic(() => import('@/components/ui/LSSignature').then(m => m.LSSignature), { ssr: false })

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-pedra text-white/70 py-10 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body">
        <p className="font-display text-white text-base">Geovana Kohut</p>

        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @kohut.fisiopilates
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="text-center md:text-right">
          <p>{CREFITO}</p>
          <p className="text-white/40 text-xs mt-1">
            © {new Date().getFullYear()} Geovana Kohut Fisioterapia e Pilates
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 flex justify-center">
        <LSSignature />
      </div>
    </footer>
  )
}
