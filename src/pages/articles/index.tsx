import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import AdsSquare from 'src/components/adsense/ads-square'
import AdsHigh from 'src/components/adsense/ads-high'
import { ArticlesResponse } from 'src/types/articles'
import { TagsResponse } from 'src/types/tags'
import { client } from 'src/utils/api'
import Pagination, { PER_PAGE } from 'src/components/pagination'
import ArticleRow from 'src/components/articles/article-row'
import TagsList from 'src/components/tags/tags-list'

const SideBar = styled.div`
  postion: -webkit-sticky;
  position: sticky;
  top: 1rem;
`

export default function Articles({ articles, tags }: { articles: ArticlesResponse, tags: TagsResponse }) {
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

          <Pagination totalCount={articles.totalCount} pageNum={1} />
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

export const getStaticProps = async () => {
  const resArticles = await client.articles.$get({
    query: {
      offset: 0,
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
      articles: resArticles,
      tags: resTags,
    },
  };
};
