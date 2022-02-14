import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import AdsSquare from 'src/components/adsense/ads-square'
import AdsHigh from 'src/components/adsense/ads-high'
import { ArticlesResponse } from 'src/types/articles'
import { TagResponse } from 'src/types/tags'
import { client } from 'src/utils/api'
import ArticleRow from 'src/components/articles/article-row'
import TagsList, { SortTags } from 'src/components/tags/tags-list'
import { GetServerSidePropsContext } from 'next';
import SearchIcon from '@material-ui/icons/Search';
import SearchBox from 'src/components/search-box'
import { Loading } from 'src/components/loading'

const QueryArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`
const Query = styled.h1`
  padding-left: 1rem;
`
const SideBar = styled.div`
  postion: -webkit-sticky;
  position: sticky;
  top: 1rem;
`
const CenterDiv = styled.div`
  color:#000;
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding: 5rem;
  font-size: 20px;
  color: rgba(0,0,0,0.54);
`

export default function ArticlesSearch({ articles, tags, query }: { articles: ArticlesResponse, tags: TagResponse[], query: string }) {
  return (
    <Layout>
      <Head
        title={`Articles - ${siteTitle}`}
        description={`Articles - ${siteTitle}`}
        url={`https://prism-cube.com/articles`}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Loading>
            <QueryArea>
              <SearchIcon />
              <Query>{query}</Query>
            </QueryArea>

            {articles.contents.map(article => (
              <ArticleRow key={article.id} article={article} />
            ))}

            {articles.contents.length ? <AdsSquare /> : <CenterDiv>記事がありません</CenterDiv>}
          </Loading>
        </Grid>

        <Grid item xs={12} md={3}>
          <SideBar>
            <TagsList tags={tags} />
            <SearchBox word={query} />
            <AdsHigh />
          </SideBar>
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.q == null ? "" : context.query.q.toString();
  const resArticles = await client.articles.$get({
    query: {
      offset: 0,
      limit: 1000,
      q: query,
      orders: "-createdAt",
    },
  })
  const tags = await SortTags()
  
  return {
    props: {
      articles: resArticles,
      tags: tags,
      query: query,
    },
  };
}
