import React from 'react'
import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import styles from 'src/styles/article.module.scss'
import AdsSquare from 'src/components/adsense/ads-square'
import AdsWide from 'src/components/adsense/ads-wide'
import AdsHigh from 'src/components/adsense/ads-high'
import { ArticleResponse, ArticlesResponse } from 'src/types/articles'
import { client } from 'src/utils/api'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'
import TagsList from 'src/components/tags/tags-list'
import Hidden from '@material-ui/core/Hidden';
import ShareButton from 'src/components/share-button'
import ArticleRow from 'src/components/articles/article-row'
import ArticlesBox from 'src/components/articles/articles-box'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css';
import SearchBox from 'src/components/search-box'

const ArticlePaper = styled(Paper)`
  padding: 1rem;
`
const DateSpan = styled.span`
  margin-right: 0.5rem;
`
const DateDiv = styled.div`
  display: flex;
  align-items: center;
`
const Img = styled.div`
  max-width: 720px;
  max-height: 540px;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
`
const SideBar = styled.div`
  postion: -webkit-sticky;
  position: sticky;
  top: 1rem;
`
const HeadingP = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`

export default function Article({ article, recommendArticles, newArticles, highlightedBody }: { article: ArticleResponse, recommendArticles: ArticlesResponse, newArticles: ArticlesResponse, highlightedBody: String }) {
  return (
    <Layout>
      <Head
        title={`${article.title}`}
        description={`${article.title} - ${siteTitle}`}
        ogImage={article.image.url}
        url={`https://prism-cube.com/articles/${article.id}`}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <AdsWide />
          <ArticlePaper>
            <article>
              <h1>{article.title}</h1>
              <DateDiv>
                <>
                  <EventNoteIcon />
                  <DateSpan>
                    <time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleDateString()}</time>
                  </DateSpan>
                </>
                {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
                  <>
                    <UpdateIcon />
                    <DateSpan>
                      <time dateTime={article.updatedAt}>{new Date(article.updatedAt).toLocaleDateString()}</time>
                    </DateSpan>
                  </>
                }
              </DateDiv>
              <Img>
                <Image
                  src={article.image.url}
                  alt={article.title}
                  width={article.image.width}
                  height={article.image.height}
                />
              </Img>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${highlightedBody}`
                }}
                className={styles.body}
              />
              <ShareButton
                url={`https://prism-cube.com/articles/${article.id}`}
                title={`${article.title}`}
              />
            </article>
          </ArticlePaper>
          
          <AdsSquare />

          <div>
            {recommendArticles.totalCount > 0 && <HeadingP>Read next</HeadingP>}
            {recommendArticles.contents.map(article => (
              <ArticleRow key={article.id} article={article} />
            ))}
          </div>
        </Grid>

        <Grid item xs={12} md={3}>
          <SideBar>
            <TagsList tags={article.tags} />
            <SearchBox />
            <AdsHigh />
            <ArticlesBox articles={newArticles} />
          </SideBar>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const response = await client.articles.$get({
    query: {
      offset: 0,
      limit: 9999,
    },
  })
  const paths = response.contents.map(content => `/articles/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const resArticle = await client.articles._id(id).$get()

  const $ = cheerio.load(resArticle.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  let filtersQueryTags: string[] = []
  resArticle.tags.forEach(tag => (
    filtersQueryTags.push("tags[contains]" + tag.id)
  ))
  const filtersQuery = "id[not_equals]" + id + "[and](" + filtersQueryTags.join("[or]") + ")"
  const resRecommendArticles = await client.articles.$get({
    query: {
      offset: 0,
      limit: 5,
      filters: filtersQuery,
    },
  })
  
  const resNewArticles = await client.articles.$get({
    query: {
      offset: 0,
      limit: 5,
    },
  })

  return {
    props: {
      article: resArticle,
      recommendArticles: resRecommendArticles,
      newArticles: resNewArticles,
      highlightedBody:$.html(),
    },
  };
};
