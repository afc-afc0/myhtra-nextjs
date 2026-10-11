import { ImageResponse } from 'next/og'

// Site-wide social preview. Uses the built-in font; to brand it with Rubik, commit a TTF and pass it via `fonts`.
export const alt = 'Myhtra Studios — AI agents and cloud platforms you can put in production'
export const size = { height: 630, width: 1200 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background:
          'radial-gradient(circle at 80% 15%, rgba(201,179,54,0.35), transparent 40%), linear-gradient(120deg, #0b1030, #1b2a7a 55%, #1390d3)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: 80,
        width: '100%'
      }}
    >
      <div style={{ display: 'flex', fontSize: 30, letterSpacing: 4, opacity: 0.8, textTransform: 'uppercase' }}>Myhtra Studios</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
          AI agents and cloud platforms
        </div>
        <div style={{ color: '#e8d96a', display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
          you can put in production.
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 28, opacity: 0.85 }}>Founder-led engineering studio · Toronto · myhtra.co</div>
    </div>,
    size
  )
}
