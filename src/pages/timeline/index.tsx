import type { NextPage, GetStaticPropsResult } from 'next'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { Heading, RichEditor } from '@/components/typography'
import { CalendarIcon } from '@/components/icons'
import { ArticlesResponse, WorksResponse } from '@/api/types'
import { client } from '@/libs/api'
import { makeFeed } from '@/features/timeline/utils/makeFeed'
import { formatDate } from '@/utils/date'

export interface PageProps {
  articles: ArticlesResponse
  works: WorksResponse
}

const Page: NextPage<PageProps> = (props) => {
  const { articles, works } = props
  const feedChunk = makeFeed(articles, works)

  return (
    <Layout>
      <Head title="Timeline" url="/timeline" />

      <Heading>Timeline</Heading>

      {feedChunk.map((feeds) => (
        <div key={feeds[0].date.getFullYear()}>
          <h2 className="text-center text-2xl font-bold">
            {feeds[0].date.getFullYear()}
          </h2>
          <div className="grid grid-cols-1 gap-6 p-4">
            {feeds.map((feed) => (
              <div key={feed.id}>
                {feed.type === 'article' && (
                  <div className="flex items-center">
                    <div className="mr-2 inline-block h-4 w-4 rounded bg-gradient-to-tl from-emerald-800 via-teal-800 to-cyan-800"></div>
                    <span className="dark:text-gray-400">
                      Published an article
                    </span>
                  </div>
                )}
                {feed.type === 'work' && (
                  <div className="flex items-center">
                    <div className="mr-2 inline-block h-4 w-4 rounded bg-gradient-to-tl from-red-900 via-orange-900 to-yellow-800"></div>
                    <span className="dark:text-gray-400">
                      Released {feed.title}
                    </span>
                  </div>
                )}
                <a href={feed.url} target="_blank">
                  <div className="mt-2 flex flex-col rounded-lg p-4 dark:bg-ashen-700">
                    <h3 className="text-xl font-bold">{feed.title}</h3>
                    {feed.type === 'work' && feed.description && (
                      <span className="mt-2 dark:text-gray-300">
                        {feed.description}
                      </span>
                    )}
                    <div className="mt-2 flex items-center dark:text-gray-400">
                      <CalendarIcon />
                      <span className="ml-2" suppressHydrationWarning>
                        {formatDate(feed.date, 'yyyy/MM/dd')}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default Page

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<PageProps>
> => {
  const articles = await client.articles.$get({
    query: {
      offset: 0,
      limit: 999999,
    },
  })

  const works = await client.works.$get({
    query: {
      offset: 0,
      limit: 999999,
    },
  })

  return {
    props: {
      articles: articles,
      works: works,
    },
  }
}
