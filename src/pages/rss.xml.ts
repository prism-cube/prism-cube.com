import { SITE } from '@/consts'
import { getAllArticles } from '@/lib/data-utils'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  try {
    const articles = await getAllArticles()

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items: articles.map((article) => ({
        title: article.data.title,
        description: article.data.description,
        pubDate: article.data.publishedDate,
        link: `/articles/${article.id}/`,
      })),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
