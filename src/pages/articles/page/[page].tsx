import Layout from 'src/components/Layout'
import Head, { siteTitle } from 'src/components/Head'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import AdsSquare from 'src/components/Adsense/AdsSquare'
import AdsHigh from 'src/components/Adsense/AdsHigh'
import { ArticlesResponse } from 'src/types/articles'
import { TagsResponse } from 'src/types/tags'
import { client } from 'src/utils/api'
import Pagination, { PER_PAGE } from 'src/components/Pagination'
import ArticleRow from 'src/components/articles/articleRow'
import TagsList from 'src/components/tags/tagsList'

const SideBar = styled.div`
  postion: -webkit-sticky;
  position: sticky;
  top: 1rem;
`

export default function ArticlesPage({ articles, tags, pageNum }: { articles: ArticlesResponse, tags: TagsResponse, pageNum: number }) {
  return (
    <Layout>
      <Head
        title={`Articles - ${siteTitle}`}
        description={`Articles - ${siteTitle}`}
        url={`https://prism-cube.com/articles`}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {articles.contents.map(article => (
            <ArticleRow key={article.id} article={article} />
          ))}

          <Pagination totalCount={articles.totalCount} pageNum={pageNum} />
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
  const response = await client.articles.$get()
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(response.totalCount / PER_PAGE)).map((repo) => `/articles/page/${repo}`)
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
  const resTags = await client.tags.$get({
    query: {
      orders: "sort",
    },
  })
  return {
    props: {
      articles: response,
      pageNum: page,
      tags: resTags,
    },
  };
};
