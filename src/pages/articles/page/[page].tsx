import Layout from 'src/components/Layout'
import Head, { siteTitle } from 'src/components/Head'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import AdsSquare from 'src/components/Adsense/AdsSquare'
import { ArticlesResponse } from 'src/types/articles'
import { client } from 'src/utils/api'
import Pagination, { PER_PAGE } from 'src/components/Pagination'
import ArticleRow from 'src/components/articles/articleRow'

export default function ArticlesPage({ articles, pageNum }: { articles: ArticlesResponse, pageNum: number }) {
  return (
    <Layout>
      <Head
        title={`Articles - ${siteTitle}`}
        description={`Articles - ${siteTitle}`}
        canonicalUrl={`https://prism-cube.com/articles`}
      />

      {articles.contents.map(article => (
        <ArticleRow key={article.id} article={article} />
      ))}

      <Pagination totalCount={articles.totalCount} pageNum={pageNum} />
      <AdsSquare />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const response = await client.articles.$get()
  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(response.totalCount / PER_PAGE)).map((repo) =>  `/articles/page/${repo}`)
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const page = context.params.page;
  const response = await client.articles.$get({
    query: {
      offset: (page - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  })
  return {
    props: {
      articles: response,
      pageNum: page,
    },
  };
};
