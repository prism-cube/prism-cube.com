import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import AdsSquare from 'src/components/adsense/ads-square'
import AdsHigh from 'src/components/adsense/ads-high'
import { ArticlesResponse } from 'src/types/articles'
import { TagResponse } from 'src/types/tags'
import { client } from 'src/utils/api'
import Pagination, { PER_PAGE } from 'src/components/pagination'
import ArticleRow from 'src/components/articles/article-row'
import TagsList, { SortTags } from 'src/components/tags/tags-list'
import SearchBox from 'src/components/search-box'

const SideBar = styled.div`
  postion: -webkit-sticky;
  position: sticky;
  top: 1rem;
`

export default function ArticlesPage({ articles, tags, pageNum }: { articles: ArticlesResponse, tags: TagResponse[], pageNum: number }) {
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
            <TagsList tags={tags} />
            <SearchBox />
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
  const tags = await SortTags()
  
  return {
    props: {
      articles: response,
      pageNum: page,
      tags: tags,
    },
  };
};
