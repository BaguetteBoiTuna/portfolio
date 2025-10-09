import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Dante's Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Stars effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                             radial-gradient(2px 2px at 60% 70%, white, transparent),
                             radial-gradient(1px 1px at 50% 50%, white, transparent),
                             radial-gradient(1px 1px at 80% 10%, white, transparent),
                             radial-gradient(2px 2px at 90% 60%, white, transparent),
                             radial-gradient(1px 1px at 33% 80%, white, transparent)`,
            backgroundSize: '200px 200px',
            opacity: 0.4,
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #fff, #a8dadc)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              marginBottom: '24px',
            }}
          >
            Dante
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#a8dadc',
              margin: 0,
              fontWeight: 300,
            }}
          >
            Software Developer
          </p>
        </div>
        
        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(to right, #e63946, #f1faee, #a8dadc)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
