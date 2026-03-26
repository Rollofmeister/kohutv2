interface SectionTagProps {
  children: React.ReactNode
  className?: string
}

export function SectionTag({ children, className = '' }: SectionTagProps) {
  return (
    <span
      className={`inline-block text-xs font-body font-medium tracking-widest uppercase text-salvia px-3 py-1 rounded-pill border border-salvia/30 bg-salvia/10 ${className}`}
    >
      {children}
    </span>
  )
}
