import Layout from 'src/components/Layout'
import Head, { siteTitle } from 'src/components/Head'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import AdsSquare from 'src/components/Adsense/AdsSquare'
import AdsHigh from 'src/components/Adsense/AdsHigh'
import { ArticlesResponse } from 'src/types/articles'
import { TagsResponse, TagResponse } from 'src/types/tags'
import { client } from 'src/utils/api'
import Pagination, { PER_PAGE } from 'src/components/Pagination'
import ArticleRow from 'src/components/articles/articleRow'
import TagsList from 'src/components/tags/tagsList'

const TagArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`
const TagName = styled.h1`
  padding-left: 1rem;
`
const SideBar = styled.div`
  postion: -webkit-sticky;
  position: sticky;
  top: 1rem;
`

export default function ArticlesTag({ articles, tags, tag }: { articles: ArticlesResponse, tags: TagsResponse, tag: TagResponse }) {
  return (
    <Layout>
      <Head
        title={`${tag.name} Articles - ${siteTitle}`}
        description={`${tag.name} Articles - ${siteTitle}`}
        url={`https://prism-cube.com/articles/tag/${tag.id}`}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
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
        </Grid>

        <Grid item xs={12} md={3}>
          <SideBar>
            <TagsList tags={tags.contents} />
            <AdsHigh />
          </SideBar>
        </Grid>
      </Grid>
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
  const resTag = await client.tags._id(id).$get()
  const resArticles = await client.articles.$get({
    query: {
      offset: 0,
      limit: 1000,
      filters: "tags[contains]" + id,
    },
  })
  const resTags = await client.tags.$get({
    query: {
      orders: "sort",
    },
  })
  return {
    props: {
      articles: resArticles,
      tag: resTag,
      tags: resTags,
    },
  };
};
