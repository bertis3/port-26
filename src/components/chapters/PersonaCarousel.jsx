import { useState } from 'react';

const personas = [
  {
    tag: 'Employed mom · Some college',
    name: 'Hard Working Hope',
    bio: "Hope has been working consistently since her teens. She took community college classes after high school and a couple more in her late 20s. Married with two kids, she manages a tight schedule — but she's been thinking about going back to finish what she started.",
    traits: ['Employed', 'Family-focused', 'Mid-30s'],
    bg: '#FAEEDA', tagBg: '#FAC775', tagText: '#412402', border: '#EF9F27',
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <circle cx="50" cy="50" r="50" fill="#FAEEDA"/>
      <ellipse cx="50" cy="93" rx="30" ry="22" fill="#EF9F27"/>
      <rect x="44" y="66" width="12" height="13" rx="4" fill="#F2C89A"/>
      <circle cx="50" cy="51" r="21" fill="#F2C89A"/>
      <path d="M 29 46 Q 30 24 50 23 Q 70 24 71 46 Q 68 30 50 29 Q 32 30 29 46Z" fill="#633806"/>
      <ellipse cx="27.5" cy="54" rx="6" ry="9" fill="#633806"/>
      <ellipse cx="72.5" cy="54" rx="6" ry="9" fill="#633806"/>
      <circle cx="43" cy="50" r="2.5" fill="#2C2C2A"/>
      <circle cx="57" cy="50" r="2.5" fill="#2C2C2A"/>
      <circle cx="44" cy="49" r="1" fill="white" opacity="0.55"/>
      <circle cx="58" cy="49" r="1" fill="white" opacity="0.55"/>
      <path d="M 43 60 Q 50 66 57 60" stroke="#412402" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 38 44 Q 43 41 47 44" stroke="#2C2C2A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M 53 44 Q 57 41 62 44" stroke="#2C2C2A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
  {
    tag: 'Re-entering workforce · HS diploma',
    name: 'New Chapter Nashida',
    bio: "At 42, Nashida recently found herself out of work. With only a high school diploma, she's considering going back to school. She wants a clear path to employment — something with a tangible outcome at the end.",
    traits: ['Job-seeking', 'Career pivot', 'Early 40s'],
    bg: '#E1F5EE', tagBg: '#9FE1CB', tagText: '#04342C', border: '#1D9E75',
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <circle cx="50" cy="50" r="50" fill="#E1F5EE"/>
      <ellipse cx="50" cy="93" rx="28" ry="21" fill="#0F6E56"/>
      <rect x="44" y="67" width="12" height="12" rx="4" fill="#C8845A"/>
      <circle cx="50" cy="51" r="21" fill="#C8845A"/>
      <path d="M 29 46 Q 30 22 50 21 Q 70 22 71 46" fill="#1A1A18"/>
      <path d="M 71 54 Q 72 68 69 78" stroke="#1A1A18" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M 29 54 Q 28 68 31 78" stroke="#1A1A18" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="43" cy="50" r="2.5" fill="#1A1A18"/>
      <circle cx="57" cy="50" r="2.5" fill="#1A1A18"/>
      <circle cx="44" cy="49" r="1" fill="white" opacity="0.55"/>
      <circle cx="58" cy="49" r="1" fill="white" opacity="0.55"/>
      <path d="M 44 60 Q 50 65 56 60" stroke="#04342C" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
  {
    tag: 'Social · Females · 1–23 credits',
    name: 'Restless Aurora',
    bio: "Aurora is 27 and has been with the same company since she was fifteen. She has a stable job and a comfortable routine. Lately she's been wondering whether staying put is the same as standing still.",
    traits: ['Social', 'Long-tenured', 'Late 20s'],
    bg: '#FAECE7', tagBg: '#F5C4B3', tagText: '#4A1B0C', border: '#D85A30',
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <circle cx="50" cy="50" r="50" fill="#FAECE7"/>
      <ellipse cx="50" cy="93" rx="28" ry="21" fill="#D85A30"/>
      <rect x="44" y="68" width="12" height="12" rx="4" fill="#E8C285"/>
      <circle cx="50" cy="52" r="21" fill="#E8C285"/>
      <circle cx="50" cy="27" r="9" fill="#2C2C2A"/>
      <rect x="46" y="34" width="8" height="6" fill="#2C2C2A"/>
      <path d="M 29 44 Q 31 23 50 23 Q 69 23 71 44 Q 64 32 50 31 Q 36 32 29 44Z" fill="#2C2C2A"/>
      <circle cx="43" cy="51" r="2.5" fill="#2C2C2A"/>
      <circle cx="57" cy="51" r="2.5" fill="#2C2C2A"/>
      <circle cx="44" cy="50" r="1" fill="white" opacity="0.55"/>
      <circle cx="58" cy="50" r="1" fill="white" opacity="0.55"/>
      <path d="M 42 61 Q 50 69 58 61" stroke="#4A1B0C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="43.5" cy="57" r="2" fill="#D85A30" opacity="0.5"/>
      <circle cx="56.5" cy="57" r="2" fill="#D85A30" opacity="0.5"/>
    </svg>`,
  },
  {
    tag: 'Age 25–34 · 1–23 credits',
    name: 'Chipping Away Channe',
    bio: "Channe is 32, married with one child. He works in construction and has been picking up classes when his schedule allows. He's been at it for a few years and wants to see it through.",
    traits: ['Career transition', 'Family-focused', 'Early 30s'],
    bg: '#E6F1FB', tagBg: '#B5D4F4', tagText: '#042C53', border: '#378ADD',
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <circle cx="50" cy="50" r="50" fill="#E6F1FB"/>
      <ellipse cx="50" cy="93" rx="28" ry="21" fill="#185FA5"/>
      <rect x="44" y="67" width="12" height="13" rx="4" fill="#B87340"/>
      <circle cx="50" cy="51" r="21" fill="#B87340"/>
      <path d="M 29 46 Q 30 24 50 23 Q 70 24 71 46 Q 68 30 50 30 Q 32 30 29 46Z" fill="#1A1A18"/>
      <path d="M 29 60 Q 29 72 35 76 Q 42 80 50 80 Q 58 80 65 76 Q 71 72 71 60 Q 62 65 50 65 Q 38 65 29 60Z" fill="#1A1A18" opacity="0.75"/>
      <circle cx="43" cy="50" r="2.5" fill="#1A1A18"/>
      <circle cx="57" cy="50" r="2.5" fill="#1A1A18"/>
      <circle cx="44" cy="49" r="1" fill="white" opacity="0.55"/>
      <circle cx="58" cy="49" r="1" fill="white" opacity="0.55"/>
      <path d="M 43 60 Q 50 65 57 60" stroke="#042C53" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 38 45 Q 43 42 47 45" stroke="#1A1A18" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M 53 45 Q 57 42 62 45" stroke="#1A1A18" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
];

const CARD_W = 220;
const CARD_H = 380;
const RADIUS = 230;

export default function PersonaCarousel() {
  const [idx, setIdx] = useState(0);

  const go = (dir) => setIdx(i => (i + dir + personas.length) % personas.length);
  const sceneAngle = -idx * 90;

  return (
    <div className="carousel-section" style={{ width: '100%', padding: '2.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

      {/* Carousel stage */}
      <div style={{ position: 'relative', width: '100%', height: CARD_H + 40 + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Prev */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous persona"
          style={{ position: 'absolute', left: 'calc(50% - ' + (RADIUS + CARD_W / 2 + 48) + 'px)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', border: '0.5px solid #888', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}
        >
          ‹
        </button>

        {/* 3D scene */}
        <div style={{ perspective: '1000px', width: CARD_W + 'px', height: CARD_H + 'px' }}>
          <div style={{
            width: CARD_W + 'px',
            height: CARD_H + 'px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
            transform: `rotateY(${sceneAngle}deg)`,
          }}>
            {personas.map((p, i) => {
              const relPos = (i - idx + personas.length) % personas.length;
              const opacity = relPos === 0 ? 1 : relPos === 2 ? 0 : 0.55;
              return (
                <div
                  key={p.name}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: CARD_W + 'px',
                    height: CARD_H + 'px',
                    transform: `rotateY(${i * 90}deg) translateZ(${RADIUS}px)`,
                    opacity,
                    transition: 'opacity 0.4s ease',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '0.5px solid rgba(0,0,0,0.1)',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'transform',
                    isolation: 'isolate',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{ width: '100%', aspectRatio: '1 / 1', background: p.bg, borderBottom: '0.5px solid rgba(0,0,0,0.08)', flexShrink: 0 }}
                    dangerouslySetInnerHTML={{ __html: p.avatar }}
                  />

                  {/* Body */}
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '10px', fontWeight: 500, padding: '3px 9px', borderRadius: '999px', background: p.tagBg, color: p.tagText, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                      {p.tag}
                    </span>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#1a1a18' }}>{p.name}</p>
                    <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.6, margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>{p.bio}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {p.traits.map(t => (
                        <span key={t} style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '999px', border: `0.5px solid ${p.border}`, background: p.bg, color: p.tagText }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          aria-label="Next persona"
          style={{ position: 'absolute', right: 'calc(50% - ' + (RADIUS + CARD_W / 2 + 48) + 'px)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', border: '0.5px solid #888', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {personas.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setIdx(i)}
            aria-label={`Go to ${p.name}`}
            style={{
              width: i === idx ? '20px' : '8px',
              height: '8px',
              borderRadius: '999px',
              background: i === idx ? personas[idx].border : '#ccc',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
