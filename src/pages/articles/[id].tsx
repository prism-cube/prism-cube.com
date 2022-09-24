import type {
  NextPage,
  GetStaticPropsResult,
  GetStaticPropsContext,
} from 'next'
import Image from 'next/future/image'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { RichEditor } from '@/components/typography'
import { CalendarPlusIcon, CalendarCheckIcon } from '@/components/icons'
import { ArticleTile } from '@/features/articles/components'
import { formatDate, equalDate } from '@/utils/date'
import { ArticleResponse } from '@/api/types'
import { client } from '@/libs/api'
import { config } from '@/constants/config'

export interface PageProps {
  article: ArticleResponse
}

const Page: NextPage<PageProps> = (props) => {
  const { article } = props

  return (
    <Layout>
      <Head title="Articles" url="/articles" />

      <div className="flex flex-col">
        <div className="lg:px-40 lg:py-8">
          <Image
            src={article.image.url}
            alt={article.title}
            width={article.image.width}
            height={article.image.height}
            className="rounded"
          />
        </div>

        <div className="flex justify-center space-x-4">
          {article.tags.map((tag) => (
            <span
              key={tag.name}
              className="rounded px-2 py-1 text-sm dark:bg-indigo-900 dark:text-gray-300"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-center space-x-4 dark:text-gray-300">
          <div className="flex items-center space-x-2">
            <CalendarPlusIcon />
            <span>Published</span>
            <time dateTime={article.createdAt} suppressHydrationWarning>
              {formatDate(new Date(article.createdAt), 'yyyy/MM/dd')}
            </time>
          </div>
          {equalDate(
            new Date(article.createdAt),
            new Date(article.updatedAt),
            'yyyy/MM/dd'
          ) && (
            <div className="flex items-center space-x-2">
              <CalendarCheckIcon />
              <span>Updated</span>
              <time dateTime={article.updatedAt} suppressHydrationWarning>
                {formatDate(new Date(article.updatedAt), 'yyyy/MM/dd')}
              </time>
            </div>
          )}
        </div>

        <h1 className="mt-8 text-2xl font-bold">{article.title}</h1>
      </div>

      <RichEditor html={article.body} className="p-4" />
    </Layout>
  )
}

export default Page

export const getStaticPaths = async () => {
  const response = await client.articles.$get({
    query: {
      offset: 0,
      limit: 999999,
    },
  })
  const paths = response.contents.map((content) => `/articles/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> => {
  const id = context.params?.id?.toString() ?? ''
  const response = await client.articles._id(id).$get()
  return {
    props: {
      article: response,
    },
  }
}
