import { useState, useEffect, useRef } from 'react';

interface Layer {
  id: string;
  name: string;
  sub: string;
  nodes: string[];
}

interface Props {
  caption: string;
  layers: Layer[];
}

export default function SystemDiagram({ caption, layers }: Props) {
  const figRef = useRef<HTMLDivElement>(null);
  const [revealCount, setRevealCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileLayer, setActiveMobileLayer] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll-driven reveal (desktop)
  // Layer 0 starts revealing when figure top is 200px from viewport top.
  // Full reveal (all 4 layers) after 520px of additional scroll.
  useEffect(() => {
    if (isMobile) return;
    const node = figRef.current;
    if (!node) return;
    const RANGE = 520;

    const onScroll = () => {
      const top = node.getBoundingClientRect().top;
      const t = Math.max(0, Math.min(1, (200 - top) / RANGE));
      setRevealCount(Math.round(t * layers.length));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile, layers.length]);

  const onCount = isMobile ? layers.length : revealCount;
  const progressWidth = `${(onCount / layers.length) * 100}%`;

  if (isMobile) {
    return (
      <div className="figure-wrap" ref={figRef}>
        <div className="fig-cap">
          <span className="figno">Fig. 01</span>
          <span className="name">{caption}</span>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid var(--rule)',
            borderRadius: 3,
            padding: 18,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {layers.map((l, i) => (
              <div
                key={l.id}
                onClick={() => setActiveMobileLayer(i)}
                style={{
                  border: `1px solid ${i === activeMobileLayer ? 'var(--accent)' : 'var(--rule)'}`,
                  background: '#fff',
                  padding: '12px 12px 14px',
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: i === activeMobileLayer ? 'var(--accent)' : 'var(--ink-3)',
                  }}
                >
                  L{i + 1} · {l.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 14,
                    marginTop: 4,
                    letterSpacing: '-0.01em',
                    color: 'var(--ink-1)',
                  }}
                >
                  {l.sub}
                </div>
                {i === activeMobileLayer && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                    {l.nodes.map(n => (
                      <span
                        key={n}
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: 10,
                          padding: '4px 7px',
                          border: '1px solid var(--rule)',
                          borderRadius: 2,
                          color: 'var(--ink-2)',
                        }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
            }}
          >
            Tap a layer to explore
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="figure-wrap" ref={figRef}>
      <div className="fig-cap">
        <span className="figno">Fig. 01</span>
        <span className="name">{caption}</span>
        <span className="scroll-hint">
          <span className="bar" />
          Scroll to reveal
        </span>
      </div>
      <div className="diagram">
        <div className="layer-list">
          {layers.map((l, i) => (
            <div key={l.id} className={`row${i < onCount ? ' on' : ''}`}>
              <span className="n">L{i + 1}</span>
              <span>
                {l.name}
                <div
                  style={{
                    fontSize: 10,
                    color: 'var(--ink-3)',
                    marginTop: 2,
                    textTransform: 'none',
                    letterSpacing: 0,
                  }}
                >
                  {l.sub}
                </div>
              </span>
              <span className="tick" />
            </div>
          ))}
        </div>
        <div className="stage">
          {layers.map((l, i) => (
            <div key={l.id} className={`col${i < onCount ? ' on' : ''}`}>
              <div className="col-label">
                L{i + 1} · {l.name}
              </div>
              <div className="nodes">
                {l.nodes.map((n, j) => (
                  <div
                    key={n}
                    className={`node${j === 0 && i < onCount ? ' accent' : i >= onCount ? ' muted' : ''}`}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="progress" style={{ width: progressWidth }} />
        </div>
      </div>
    </div>
  );
}
