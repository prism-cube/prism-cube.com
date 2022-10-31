import type {
  NextPage,
  GetStaticPropsResult,
  GetStaticPropsContext,
} from 'next'
import Image from 'next/image'

import cheerio from 'cheerio'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { RichEditor } from '@/components/typography'
import { ShareButtons } from '@/components/share'
import { CalendarPlusIcon, CalendarCheckIcon } from '@/components/icons'
import { AdSense } from '@/components/adsense'
import { formatDate, equalDate } from '@/utils/date'
import { ArticleResponse } from '@/api/types'
import { client } from '@/libs/api'

export interface PageProps {
  article: ArticleResponse
  articleBody: string
}

const Page: NextPage<PageProps> = (props) => {
  const { article, articleBody } = props

  return (
    <Layout>
      <Head
        title={article.title}
        url={`/articles/${article.id}`}
        ogImage={article.image.url}
      />

      <div className="lg:px-40 lg:py-8">
        <Image
          src={article.image.url}
          alt={article.title}
          width={article.image.width}
          height={article.image.height}
          className="rounded"
        />
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {article.tags.map((tag) => (
          <span
            key={tag.name}
            className="rounded px-2 py-1 text-sm dark:bg-indigo-900 dark:text-gray-300"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="mt-4 dark:text-gray-300 lg:flex lg:justify-center lg:space-x-4">
        <div className="flex items-center justify-center space-x-2">
          <CalendarPlusIcon />
          <span>Published</span>
          <time dateTime={article.createdAt} suppressHydrationWarning>
            {formatDate(new Date(article.createdAt), 'yyyy/MM/dd')}
          </time>
        </div>
        {!equalDate(
          new Date(article.createdAt),
          new Date(article.updatedAt),
          'yyyy/MM/dd'
        ) && (
          <div className="flex items-center justify-center space-x-2">
            <CalendarCheckIcon />
            <span>Updated</span>
            <time dateTime={article.updatedAt} suppressHydrationWarning>
              {formatDate(new Date(article.updatedAt), 'yyyy/MM/dd')}
            </time>
          </div>
        )}
      </div>

      <h1 className="mt-8 flex justify-center text-2xl font-bold">
        {article.title}
      </h1>

      <RichEditor html={articleBody} className="pb-8 pt-16 lg:pt-24" />

      <ShareButtons url={`/articles/${article.id}`} title={article.title} />

      <AdSense type="wide" />
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
  const { params } = context
  if (!params?.id) {
    throw new Error('Error: ID not found')
  }
  const id = params.id.toString()

  const response = await client.articles._id(id).$get()

  const $ = cheerio.load(response.body || '')
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    props: {
      article: response,
      articleBody: $.html(),
    },
  }
}
