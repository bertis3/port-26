import { useEffect, useRef, useState } from "react";

const W = 481;
const H = 629;

// ── Fading scanline animation ──────────────────────────────────────────────
const NUM_FADE_LINES = 7;
const FADE_SPEED = 0.00022; // opacity per ms

type FadeLine = {
  x: number;
  opacity: number;
  target: number;
  dir: 1 | -1;
  pauseUntil: number;
};

function makeFadeLine(ts: number, staggerMs = 0): FadeLine {
  return {
    x: Math.floor(Math.random() * Math.floor(W / 4)) * 4 + 3,
    opacity: 0,
    target: 0.07 + Math.random() * 0.12,
    dir: 1,
    pauseUntil: ts + staggerMs,
  };
}

// ── Slice glitch ───────────────────────────────────────────────────────────
type Slice = { id: number; topPct: number; botPct: number; dx: number };
let uid = 0;

function makeSlices(): Slice[] {
  const count = Math.random() < 0.4 ? 2 : 3;
  return Array.from({ length: count }, () => {
    const top = 30 + Math.random() * 520;
    const h = 12 + Math.random() * 58;
    const bot = Math.max(0, H - top - h);
    return {
      id: uid++,
      topPct: (top / H) * 100,
      botPct: (bot / H) * 100,
      dx: (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 20),
    };
  });
}

// ── Component ──────────────────────────────────────────────────────────────
export default function HeroGlitch() {
  const [slices, setSlices] = useState<Slice[]>([]);
  const [imgNudge, setImgNudge] = useState(0);      // whole-image translateX, px
  const [imgOpacity, setImgOpacity] = useState(0.7); // whole-image opacity

  const lineCanvasRef = useRef<HTMLCanvasElement>(null);
  const lineRaf = useRef<number>(0);
  const sliceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fading scanlines (canvas) ────────────────────────────────────────────
  useEffect(() => {
    const canvas = lineCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lines: FadeLine[] = Array.from({ length: NUM_FADE_LINES }, (_, i) =>
      makeFadeLine(0, i * 600 + Math.random() * 800),
    );
    let prev = 0;

    function drawLines(ts: number) {
      if (!ctx || !canvas) return;
      const dt = ts - prev;
      prev = ts;
      ctx.clearRect(0, 0, W, H);

      for (const ln of lines) {
        if (ts < ln.pauseUntil) continue;
        if (ln.dir === 1) {
          ln.opacity = Math.min(ln.target, ln.opacity + dt * FADE_SPEED);
          if (ln.opacity >= ln.target) {
            ln.dir = -1;
            ln.pauseUntil = ts + 400 + Math.random() * 900;
          }
        } else {
          ln.opacity = Math.max(0, ln.opacity - dt * FADE_SPEED);
          if (ln.opacity <= 0)
            Object.assign(ln, makeFadeLine(ts, 300 + Math.random() * 1200));
        }
        ctx.fillStyle = `rgba(29,78,216,${ln.opacity.toFixed(3)})`;
        ctx.fillRect(ln.x, 0, 1, H);
      }
      lineRaf.current = requestAnimationFrame(drawLines);
    }

    lineRaf.current = requestAnimationFrame(drawLines);
    return () => cancelAnimationFrame(lineRaf.current);
  }, []);

  // ── Slice glitch ─────────────────────────────────────────────────────────
  useEffect(() => {
    function schedule() {
      sliceTimer.current = setTimeout(() => {
        setSlices(makeSlices());
        sliceTimer.current = setTimeout(() => {
          setSlices([]);
          if (Math.random() < 0.4) {
            sliceTimer.current = setTimeout(() => {
              setSlices(makeSlices());
              sliceTimer.current = setTimeout(() => {
                setSlices([]);
                schedule();
              }, 50 + Math.random() * 40);
            }, 60 + Math.random() * 40);
          } else {
            schedule();
          }
        }, 140 + Math.random() * 80);
      }, 4000 + Math.random() * 4500);
    }
    schedule();
    return () => { if (sliceTimer.current) clearTimeout(sliceTimer.current); };
  }, []);

  // ── Whole-image nudge ────────────────────────────────────────────────────
  useEffect(() => {
    function schedule() {
      nudgeTimer.current = setTimeout(() => {
        const dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3);
        setImgNudge(dx);
        nudgeTimer.current = setTimeout(() => {
          setImgNudge(0);
          // occasional double-nudge echo
          if (Math.random() < 0.4) {
            nudgeTimer.current = setTimeout(() => {
              setImgNudge((Math.random() < 0.5 ? -1 : 1) * (1 + Math.random() * 2));
              nudgeTimer.current = setTimeout(() => {
                setImgNudge(0);
                schedule();
              }, 50 + Math.random() * 40);
            }, 40 + Math.random() * 40);
          } else {
            schedule();
          }
        }, 70 + Math.random() * 80);
      }, 14000 + Math.random() * 8000); // every 14–22s
    }
    schedule();
    return () => { if (nudgeTimer.current) clearTimeout(nudgeTimer.current); };
  }, []);

  // ── Whole-image opacity flicker ──────────────────────────────────────────
  useEffect(() => {
    function schedule() {
      flickTimer.current = setTimeout(() => {
        setImgOpacity(0.35 + Math.random() * 0.25); // drop to 0.35–0.60, never above default 0.7
        flickTimer.current = setTimeout(() => {
          setImgOpacity(0.7);
          // occasional second flicker
          if (Math.random() < 0.35) {
            flickTimer.current = setTimeout(() => {
              setImgOpacity(0.4 + Math.random() * 0.2);
              flickTimer.current = setTimeout(() => {
                setImgOpacity(0.7);
                schedule();
              }, 40 + Math.random() * 40);
            }, 35 + Math.random() * 40);
          } else {
            schedule();
          }
        }, 55 + Math.random() * 65);
      }, 18000 + Math.random() * 10000); // every 18–28s
    }
    schedule();
    return () => { if (flickTimer.current) clearTimeout(flickTimer.current); };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {/* Hero image — nudge wrapper isolates translateX from the scaleX flip */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          transform: `translateX(${imgNudge}px)`,
        }}
      >
        <img
          src="/hero_1b_c.png"
          alt="Gene Davis"
          width={W}
          height={H}
          style={{
            display: "block",
            transform: "scaleX(-1)",
            filter: "contrast(1.05) brightness(0.97)",
            opacity: imgOpacity,
          }}
        />
      </div>

      {/* Overlay: scanlines + fading lines + slice glitches */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        {/* Static vertical scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(to right, transparent 0px, transparent 3px, rgba(29,78,216,0.05) 3px, rgba(29,78,216,0.05) 4px)",
            mixBlendMode: "multiply",
            zIndex: 1,
          }}
        />

        {/* Individually fading scanlines */}
        <canvas
          ref={lineCanvasRef}
          width={W}
          height={H}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            mixBlendMode: "multiply",
            zIndex: 2,
          }}
        />

        {/* Displaced image slices */}
        {slices.map((s) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              clipPath: `inset(${s.topPct.toFixed(2)}% 0 ${s.botPct.toFixed(2)}% 0)`,
              transform: `translateX(${s.dx}px)`,
              zIndex: 3,
            }}
          >
            <img
              src="/hero_1b_c.png"
              alt=""
              style={{
                display: "block",
                width: `${W}px`,
                height: `${H}px`,
                transform: "scaleX(-1)",
                filter: "contrast(1.05) brightness(0.97)",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0, bottom: 0,
                [s.dx > 0 ? "left" : "right"]: 0,
                width: "2px",
                background: "rgba(96,165,250,0.9)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
