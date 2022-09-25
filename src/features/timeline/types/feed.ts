export type Feed = {
  id: number
  title: string
  description?: string
  date: Date
  type: FeedType
  url: string
}

export type FeedType = 'article' | 'work'
