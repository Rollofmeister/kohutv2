'use client'

import { useEffect, useRef } from 'react'
import { mountLSSignature } from 'ls-signature-footer'

export function LSSignature() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    mountLSSignature(ref.current, {
      language: 'pt',
      textColor: '#6B8F71',
      mutedColor: 'rgba(255,255,255,0.4)',
    })
  }, [])

  return <div ref={ref} />
}
