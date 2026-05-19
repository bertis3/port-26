import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const Outcome = z.object({ num: z.string(), lbl: z.string() });

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
    artifacts: z.array(Artifact),
  }),
});

const creatives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/creatives' }),
  schema: ({ image }) =>
    z.object({
      number: z.string(),
      title: z.string(),
      type: z.literal('creative'),
      category: z.string(),
      client: z.string(),
      year: z.number(),
      methods: z.array(z.string()),
      singleImage: z.boolean().optional().default(false),
      creatives: z.array(
        z.object({
          src: image(),
          title: z.string(),
          dimensions: z.string(),
        })
      ),
    }),
});

export const collections = { chapters, creatives };
