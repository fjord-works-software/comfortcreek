import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/data/pages' }),
  schema: z.object({
    title: z.string(),
    intro: z.string().optional(),
    email: z.string().optional(),
    hero_heading: z.string().optional(),
    hero_subtext: z.string().optional(),
    cta_label: z.string().optional(),
    cta_url: z.string().optional(),
    intro_heading: z.string().optional(),
    intro_body: z.string().optional(),
    insurances: z.array(z.object({ name: z.string(), logo: z.string().optional() })).optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/data/team' }),
  schema: z.object({
    name: z.string(),
    credentials: z.string(),
    title: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, team, blog };
