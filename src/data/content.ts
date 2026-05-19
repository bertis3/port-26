export const navLinks = ["Work", "Experience"] as const;

export const workItems = [
  {
    n: "01",
    title: "Conversion Experimentation",
    type: "case" as const,
    tag: "CRO · RPV · A/B · Multivariate",
    metric: "10,000+ tests",
    year: "2010-19",
    slug: "conversion-experimentation",
  },
  {
    n: "02",
    title: "AI Production Systems",
    type: "case" as const,
    tag: "AI · Automation",
    metric: "82% faster",
    year: "2024-25",
    slug: "ai-production-systems",
  },
  {
    n: "03",
    title: "UX Research",
    type: "case" as const,
    tag: "Personas",
    metric: "3 testing tracks",
    year: "2017",
    slug: "ux-research",
  },
  {
    n: "04",
    title: "Howl Single Page Prototype",
    type: "creative" as const,
    tag: "Homepage · Prototype",
    metric: "Single-page",
    year: "2022",
    slug: "howl-prototype",
  },
  {
    n: "05",
    title: "Boeing Epic",
    type: "creative" as const,
    tag: "Display · Animated",
    metric: "~136 assets",
    year: "2010",
    slug: "boeing-epic-banners",
  },
] as const;

export const processChain = [
  "Identify",
  "Hypothesize",
  "Create",
  "Test",
  "Analyze",
  "Iterate",
] as const;

export const skills = [
  "Cross-functional Leadership",
  "Experimentation Strategy",
  "A/B & MVT",
  "CRO · RPV",
  "Funnel Optimization",
  "Form UX",
  "UX Research",
  "UX Writing · Microcopy",
  "HTML · CSS · JS",
  "React",
  "Figma · XD",
  "AI Systems Design",
  "Prompt Engineering",
  "Design Systems",
  "Data Viz · Tableau",
] as const;

export const stats = [
  { value: "20+", label: "years" },
  { value: "10,000+", label: "a/b and multivariate tests" },
  { value: "up to 82%", label: "process time reduction" },
  { value: "200+", label: "brands" },
] as const;

export const experience = [
  {
    role: "AI Production Systems Consultant",
    company: "Rooftop Digital",
    period: "2025",
  },
  {
    role: "Senior Manager, Creative Design & Development",
    company: "Rooftop Digital",
    period: "2020–2025",
  },
  {
    role: "Senior UX Designer, Experimentation & Conversion",
    company: "Core Digital Media",
    period: "2010–2019",
  },
  {
    role: "Interactive Designer & Developer",
    company: "JWT Inside",
    period: "2007–2010",
  },
] as const;
