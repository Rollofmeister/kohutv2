import Image from 'next/image'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionTag } from '@/components/ui/SectionTag'
import { galleryImages } from '@/lib/data'

export function GallerySection() {
  const [main, ...rest] = galleryImages

  return (
    <section id="galeria" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionTag className="mb-4">Espaço</SectionTag>
            <h2 className="font-display font-light text-pedra text-4xl md:text-5xl">
              Conheça o estúdio
            </h2>
          </div>
        </FadeUp>

        {/* Mobile: horizontal scroll */}
        <div
          className="md:hidden flex gap-3 overflow-x-auto pb-3"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="flex-shrink-0 w-[75vw] aspect-[4/3] rounded-card overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={450}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Desktop: masonry — large left + 2x2 right */}
        <FadeUp>
          <div className="hidden md:grid grid-cols-2 gap-4 h-[600px]">
            <div className="rounded-card overflow-hidden">
              <Image
                src={main.src}
                alt={main.alt}
                width={700}
                height={600}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {rest.map((img) => (
                <div key={img.src} className="rounded-card overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={350}
                    height={290}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
