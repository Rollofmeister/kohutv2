import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Geovana Kohut Fisioterapia e Pilates em Campo Mourão'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F4EFE6',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 80,
        }}
      >
        <p
          style={{
            fontSize: 18,
            color: '#6B8F71',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Pilates terapêutico e fisioterapia — Campo Mourão, PR
        </p>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 300,
            color: '#3D3635',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Geovana Kohut
        </h1>
        <p
          style={{
            fontSize: 24,
            color: '#7A6458',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Fisioterapia e Pilates com cuidado individual
        </p>
      </div>
    ),
    { ...size }
  )
}
