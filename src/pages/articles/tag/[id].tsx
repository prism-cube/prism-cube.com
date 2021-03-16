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
import { TagResponse } from 'src/types/tags'
import { client } from 'src/utils/api'
import Pagination, { PER_PAGE } from 'src/components/Pagination'
import ArticleRow from 'src/components/articles/articleRow'

const TagArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`
const TagName = styled.h1`
  padding-left: 1rem;
`

export default function ArticlesTag({ articles, tag }: { articles: ArticlesResponse, tag: TagResponse }) {
  return (
    <Layout>
      <Head
        title={`${tag.name} Articles - ${siteTitle}`}
        description={`${tag.name} Articles - ${siteTitle}`}
        canonicalUrl={`https://prism-cube.com/articles/tag/${tag.id}`}
      />

      <TagArea>
        <Image
          src={tag.icon.url}
          alt={tag.name}
          width={60}
          height={60}
        />
        <TagName>{tag.name}</TagName>
      </TagArea>

      {articles.contents.map(article => (
        <ArticleRow key={article.id} article={article} />
      ))}

      <AdsSquare />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const response = await client.tags.$get()
  const paths = response.contents.map(tag => `/articles/tag/${tag.id}`)
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const tagResponse = await client.tags._id(id).$get()
  const response = await client.articles.$get({
    query: {
      offset: 0,
      limit: 1000,
      filters: "tags[contains]" + id,
    },
  })
  return {
    props: {
      articles: response,
      tag: tagResponse,
    },
  };
};
