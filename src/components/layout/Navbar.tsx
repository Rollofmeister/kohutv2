'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-linho/95 backdrop-blur-md shadow-warm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="#inicio" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-borda">
            <Image
              src="/logo-geovana.jpg"
              alt="Geovana Kohut"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-normal text-pedra">
              Geovana Kohut
            </p>
            <p className="font-body text-[10px] text-casca tracking-wide">
              Fisioterapia e Pilates
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-casca hover:text-salvia transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-salvia text-white text-sm font-body font-medium rounded-pill hover:bg-salvia/90 transition-colors duration-200 min-h-[44px]"
        >
          Agendar avaliação
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            className={`block w-5 h-0.5 bg-pedra transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-pedra transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-pedra transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-linho/98 backdrop-blur-md border-t border-borda px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-base text-pedra hover:text-salvia transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-salvia text-white text-sm font-body font-medium rounded-pill hover:bg-salvia/90 transition-colors min-h-[48px]"
          >
            Agendar avaliação
          </a>
        </div>
      )}
    </header>
  )
}
