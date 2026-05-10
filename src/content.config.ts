import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const Outcome = z.object({ num: z.string(), lbl: z.string() });

const ChapterRef = z.object({
  num: z.string(),
  title: z.string(),
  meta: z.string(),
  slug: z.string().optional(),
});

const Artifact = z.object({
  num: z.string(),
  title: z.string(),
  tag: z.string(),
  meta: z.string(),
  year: z.string(),
});

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/chapters' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    category: z.string(),
    era: z.string(),
    methods: z.array(z.string()),
    outcomes: z.array(Outcome),
    prev: ChapterRef.optional(),
    next: ChapterRef.optional(),
    artifacts: z.array(Artifact),
  }),
});

export const collections = { chapters };
