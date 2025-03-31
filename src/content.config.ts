import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      platforms: z.array(z.string()),
      techs: z.array(z.string()),
      link: z.string().url().optional(),
      githubLink: z.string().url().optional(),
      appStoreLink: z.string().url().optional(),
      googlePlayLink: z.string().url().optional(),
      draft: z.boolean().optional(),
    }),
})

export const collections = { articles, works }
