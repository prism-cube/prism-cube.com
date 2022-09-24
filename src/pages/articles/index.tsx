import type { NextPage, GetStaticPropsResult } from 'next'

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
}

const Page: NextPage<PageProps> = (props) => {
  const { articles } = props

  return (
    <Layout>
      <Head title="Articles" url="/articles" />

      <Heading>Articles</Heading>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {articles.contents.map((article) => (
          <ArticleTile key={article.id} article={article} />
        ))}
      </div>

      <Pagination
        totalCount={articles.totalCount}
        currentPage={1}
        url="/articles/page"
      />
    </Layout>
  )
}

export default Page

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<PageProps>
> => {
  const response = await client.articles.$get({
    query: {
      offset: 0,
      limit: config.LIST_LIMIT,
    },
  })
  return {
    props: {
      articles: response,
    },
  }
}
