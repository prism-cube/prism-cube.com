import type { SocialLink, Timeline } from '@/types'
import { getCollection, type CollectionEntry } from 'astro:content'

export async function getAllArticles(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles')
  return articles
    .filter((article) => !article.data.draft)
    .sort(
      (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
    )
}

export async function getAdjacentArticles(currentId: string): Promise<{
  prev: CollectionEntry<'articles'> | null
  next: CollectionEntry<'articles'> | null
}> {
  const articles = await getAllArticles()
  const currentIndex = articles.findIndex((article) => article.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? articles[currentIndex - 1] : null,
    prev:
      currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  }
}

export function groupArticlesByYear(
  articles: CollectionEntry<'articles'>[],
): Record<string, CollectionEntry<'articles'>[]> {
  return articles.reduce(
    (acc: Record<string, CollectionEntry<'articles'>[]>, article) => {
      const year = article.data.publishedDate.getFullYear().toString()
      ;(acc[year] ??= []).push(article)
      return acc
    },
    {},
  )
}

export async function getRecentArticles(
  count: number,
): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getAllArticles()
  return articles.slice(0, count)
}

export async function getAllTags(): Promise<Map<string, number>> {
  const articles = await getAllArticles()

  return articles.reduce((acc, article) => {
    article.data.tags?.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1)
    })
    return acc
  }, new Map<string, number>())
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tagCounts = await getAllTags()

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag)
    })
}

export async function getArticlesByTag(
  tag: string,
): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getAllArticles()
  return articles.filter((article) => article.data.tags?.includes(tag))
}

export async function getAllWorks(): Promise<CollectionEntry<'works'>[]> {
  const works = await getCollection('works')
  return works
    .filter((work) => !work.data.draft)
    .sort(
      (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
    )
}

export async function getRecentWorks(
  count: number,
): Promise<CollectionEntry<'works'>[]> {
  const works = await getAllWorks()
  return works.slice(0, count)
}

export async function getAllTimeline(): Promise<Timeline[]> {
  const articles = await getCollection('articles')
  const works = await getCollection('works')

  const timeline: Timeline[] = []
  for (const article of articles.filter((article) => !article.data.draft)) {
    timeline.push({
      title: article.data.title,
      description: article.data.description,
      category: 'article',
      links: [{ href: `/articles/${article.id}`, label: 'Website' }],
      publishedDate: article.data.publishedDate,
    })
  }
  for (const work of works.filter((work) => !work.data.draft)) {
    timeline.push({
      title: work.data.name,
      description: work.data.description,
      category: 'work',
      links: [
        work.data.link && { href: work.data.link, label: 'Website' },
        work.data.githubLink && { href: work.data.githubLink, label: 'GitHub' },
        work.data.appStoreLink && {
          href: work.data.appStoreLink,
          label: 'AppStore',
        },
        work.data.googlePlayLink && {
          href: work.data.googlePlayLink,
          label: 'GooglePlay',
        },
      ].filter(Boolean) as SocialLink[],
      publishedDate: work.data.publishedDate,
    })
  }

  return timeline.sort(
    (a, b) => b.publishedDate.valueOf() - a.publishedDate.valueOf(),
  )
}

export function groupTimelineByYear(
  timeline: Timeline[],
): Record<string, Timeline[]> {
  return timeline.reduce((acc: Record<string, Timeline[]>, item) => {
    const year = item.publishedDate.getFullYear().toString()
    ;(acc[year] ??= []).push(item)
    return acc
  }, {})
}
