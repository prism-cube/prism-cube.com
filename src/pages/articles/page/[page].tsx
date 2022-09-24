import type {
  NextPage,
  GetStaticPropsResult,
  GetStaticPropsContext,
} from 'next'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { Heading } from '@/components/typography'
import { Pagination } from '@/components/pagination'
import { ArticleTile } from '@/features/articles/components'
import { ArticlesResponse } from '@/api/types'
import { client } from '@/libs/api'
import { config } from '@/constants/config'

export interface PageProps {
  articles: ArticlesResponse
  currentPage: number
}

const Page: NextPage<PageProps> = (props) => {
  const { articles, currentPage } = props

  return (
    <Layout>
      <Head
        title="Articles"
        url={currentPage === 1 ? '/articles' : `/articles/page/${currentPage}`}
      />

      <Heading>Articles</Heading>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {articles.contents.map((article) => (
          <ArticleTile key={article.id} article={article} />
        ))}
      </div>

      <Pagination
        totalCount={articles.totalCount}
        currentPage={currentPage}
        url="/articles/page"
      />
    </Layout>
  )
}

export default Page

export const getStaticPaths = async () => {
  const response = await client.articles.$get()
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(
    1,
    Math.ceil(response.totalCount / config.LIST_LIMIT)
  ).map((repo) => `/articles/page/${repo}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> => {
  const { params } = context
  if (!params?.page) {
    throw new Error('Error: Page not found')
  }
  const page = Number(params.page)

  const response = await client.articles.$get({
    query: {
      offset: (page - 1) * config.LIST_LIMIT,
      limit: config.LIST_LIMIT,
    },
  })
  return {
    props: {
      articles: response,
      currentPage: page,
    },
  }
}
