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

export default function Articles({ articles }: { articles: ArticlesResponse }) {
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

      <Pagination totalCount={articles.totalCount} pageNum={1} />
      <AdsSquare />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const response = await client.articles.$get({
    query: {
      offset: 0,
      limit: PER_PAGE,
    },
  })
  return {
    props: {
      articles: response,
    },
  };
};
