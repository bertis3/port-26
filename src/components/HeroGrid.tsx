import { useMemo } from 'react';

const CELL = 44;
const GAP = 5;
// Enough to cover the 481×629 photo column with overflow clipped by parent.
const COLS = 11;
const ROWS = 15;

// 2 opposite corners rounded, 2 opposite corners square — alternating diagonally.
// border-radius order: top-left top-right bottom-right bottom-left
const RADIUS_A = '50% 0 50% 0'; // TL + BR rounded
const RADIUS_B = '0 50% 0 50%'; // TR + BL rounded

type Cell = {
  opLow: number;
  opHigh: number;
  duration: number;
  delay: number;
  radius: string;
};

export default function HeroGrid() {
  const cells: Cell[][] = useMemo(() =>
    Array.from({ length: ROWS }, (_, row) =>
      Array.from({ length: COLS }, (_, col) => {
        const punchy = Math.random() < 0.07;
        return {
          opLow:    punchy ? 0.08 + Math.random() * 0.05 : 0.02 + Math.random() * 0.04,
          opHigh:   punchy ? 0.55 + Math.random() * 0.25 : 0.07 + Math.random() * 0.10,
          duration: 8 + Math.random() * 9,
          delay:    -(Math.random() * 22),
          radius:   (row + col) % 2 === 0 ? RADIUS_A : RADIUS_B,
        };
      })
    ), []
  );

  // Intersecting linear gradients: fade at all four edges of the photo column.
  const maskH = 'linear-gradient(to right,  transparent 0%, black 18%, black 85%, transparent 100%)';
  const maskV = 'linear-gradient(to bottom, transparent 0%, black  8%, black 94%, transparent 100%)';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        maskImage: `${maskH}, ${maskV}`,
        WebkitMaskImage: `${maskH}, ${maskV}`,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          gap: `${GAP}px`,
        }}
      >
        {cells.map((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              style={
                {
                  backgroundColor: '#1d4ed8',
                  borderRadius: cell.radius,
                  animation: `heroPulse ${cell.duration}s ease-in-out ${cell.delay}s infinite`,
                  '--op-low': cell.opLow,
                  '--op-high': cell.opHigh,
                } as React.CSSProperties
              }
            />
          ))
        )}
      </div>
      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: var(--op-low); }
          50%       { opacity: var(--op-high); }
        }
      `}</style>
    </div>
  );
}
