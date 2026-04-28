import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kohutfisiopilates.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [
        'https://kohutfisiopilates.com/profissional.webp',
        'https://kohutfisiopilates.com/kohut-pro.webp',
        'https://kohutfisiopilates.com/galeria/espaco-cadillac-reformer.webp',
        'https://kohutfisiopilates.com/galeria/espaco-biombos.webp',
        'https://kohutfisiopilates.com/galeria/espaco-sala-espelho.webp',
        'https://kohutfisiopilates.com/galeria/espaco-visao-geral.webp',
        'https://kohutfisiopilates.com/galeria/espaco-panoramica.webp',
      ],
    },
  ]
}
