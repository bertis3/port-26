import { useEffect, useState } from "react";
import HeroGrid from "./HeroGrid";
// HeroHelix is available but not in the active pool — restore by adding it back to VARIANT_COUNT and the BgComponent logic below
// import HeroHelix from "./HeroHelix";
import HeroGlitch from "./HeroGlitch";

const SESSION_KEY = "hero-animation-variant";
const VARIANT_COUNT = 2; // 0 = Grid, 1 = Glitch

export default function HeroAnimation() {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    let pick: number;
    if (stored !== null) {
      const n = parseInt(stored, 10);
      pick = n >= 0 && n < VARIANT_COUNT ? n : 0;
    } else {
      pick = Math.floor(Math.random() * VARIANT_COUNT);
      sessionStorage.setItem(SESSION_KEY, String(pick));
    }
    setIdx(pick);
  }, []);

  if (idx === null) return null;

  // Glitch renders its own image internally at opacity 0.7
  if (idx === 1) return <HeroGlitch />;

  // Grid (0) is a background — sits behind the image
  return (
    <>
      <HeroGrid />
      <img
        src="/hero_1b_c.png"
        alt="Gene Davis"
        className="block"
        style={{
          position: "relative",
          zIndex: 10,
          transform: "scaleX(-1)",
          filter: "contrast(1.05) brightness(0.97)",
          opacity: 0.8,
        }}
      />
    </>
  );
}
