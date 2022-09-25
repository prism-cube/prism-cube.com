import { ArticlesResponse, WorksResponse } from '@/api/types'
import { Feed } from '@/features/timeline/types/feed'
import { config } from '@/constants/config'

export const makeFeed = (articles: ArticlesResponse, works: WorksResponse) => {
  let feedList: Feed[] = []
  let index = 0

  for (const article of articles.contents) {
    feedList.push({
      id: index,
      title: article.title,
      date: new Date(article.createdAt),
      type: 'article',
      url: `${config.SITE_URL}/articles/${article.id}`,
    })
    index++
  }

  for (const work of works.contents) {
    feedList.push({
      id: index,
      title: work.title,
      description: work.description,
      date: new Date(work.openAt ?? work.createdAt),
      type: 'work',
      url: work.url ?? `${config.SITE_URL}/works`,
    })
    index++
  }

  feedList = feedList.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })

  return splitFeedList(feedList)
}

const splitFeedList = (feedList: Feed[]) => {
  let result: Feed[][] = []

  let lastFeedDate: Date = new Date('1996/1/1')
  let currentFeedList: Feed[] = []

  for (const feed of feedList) {
    if (lastFeedDate.getFullYear() !== feed.date.getFullYear()) {
      if (currentFeedList.length > 0) {
        result.push(currentFeedList)
      }

      currentFeedList = []
    }

    lastFeedDate = feed.date
    currentFeedList.push(feed)
  }

  if (currentFeedList.length > 0) {
    result.push(currentFeedList)
  }

  return result
}
