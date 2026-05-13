import { useEffect, useRef } from "react";

const NUM = 24; // particles per strand
const HEIGHT = 10; // half-height in helix units
const RADIUS = 5.5; // helix radius in helix units
const FOCAL = 18; // perspective focal length
const PX = 28; // pixels per helix unit

const COL_A = [29, 78, 216] as const; // #60a5fa — blue-400 — accent blue
const COL_B = [96, 165, 250] as const; // #38bdf8 — sky (lighter strand)

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let t0: number | null = null;

    function frame(ts: number) {
      if (!canvas || !ctx) return;
      if (t0 === null) t0 = ts;
      const ms = ts - t0;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Y-axis rotation — continuous, one direction, ~25s per revolution
      const rotY = ms * 0.000252;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Slow helix wind — continuous, one direction, ~40s per full twist
      const wind = ms * 0.000158;

      type Proj = {
        sx: number;
        sy: number;
        scale: number;
        col: readonly [number, number, number];
        phase: number;
      };
      const pts: Proj[] = [];

      for (let i = 0; i < NUM; i++) {
        const order = i / (NUM - 1);
        // Fixed helix shape (1.5 turns top-to-bottom) plus a slow continuous wind
        const base = lerp(-Math.PI * 1.5, Math.PI * 1.5, order) + wind;

        for (let s = 0; s < 2; s++) {
          const angle = base + (s === 1 ? Math.PI : 0);

          const x = Math.cos(angle) * RADIUS;
          const y = lerp(-HEIGHT, HEIGHT, order);
          const z = Math.sin(angle) * RADIUS;

          // Y-axis rotation
          const rx = x * cosY + z * sinY;
          const ry = y;
          const rz = -x * sinY + z * cosY;

          // Perspective projection
          const scale = FOCAL / (FOCAL + rz);
          pts.push({
            sx: rx * scale * PX,
            sy: ry * scale * PX,
            scale,
            col: s === 0 ? COL_A : COL_B,
            phase: order + s * 0.5,
          });
        }
      }

      ctx.save();
      ctx.translate(W / 2, H / 2);

      // --- Connecting lines ---
      for (let i = 0; i < NUM; i++) {
        const p1 = pts[i * 2];
        const p2 = pts[i * 2 + 1];
        const avgScale = (p1.scale + p2.scale) / 2;
        const lineAlpha = Math.min(
          0.4,
          Math.max(0.08, lerp(0.08, 0.38, (avgScale - 0.75) / 0.6)),
        );
        ctx.strokeStyle = `rgba(29, 78, 216, ${lineAlpha.toFixed(2)})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      // --- Particles — sorted back-to-front for correct depth overlap ---
      const sorted = [...pts].sort((a, b) => a.scale - b.scale);
      for (const p of sorted) {
        const osc = 0.5 + 0.5 * Math.sin(ms * 0.000945 + p.phase * Math.PI * 2);
        const r = Math.max(1, (2.2 + osc * 2.0) * p.scale);
        const alpha = Math.min(
          1,
          Math.max(0.10, lerp(0.12, 0.60, (p.scale - 0.75) / 0.6)),
        );

        ctx.shadowColor = `rgba(${p.col[0]}, ${p.col[1]}, ${p.col[2]}, 0.75)`;
        ctx.shadowBlur = r * 3.5;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col[0]}, ${p.col[1]}, ${p.col[2]}, ${alpha.toFixed(2)})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const maskH =
    "linear-gradient(to right,  transparent 0%, black 18%, black 85%, transparent 100%)";
  const maskV =
    "linear-gradient(to bottom, transparent 0%, black  8%, black 94%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        maskImage: `${maskH}, ${maskV}`,
        WebkitMaskImage: `${maskH}, ${maskV}`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <canvas
        ref={canvasRef}
        width={481}
        height={629}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
