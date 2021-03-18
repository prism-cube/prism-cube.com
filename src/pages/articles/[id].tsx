import Layout from 'src/components/Layout'
import Head, { siteTitle } from 'src/components/Head'
import styled from 'styled-components'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import styles from 'src/styles/article.module.scss'
import AdsSquare from 'src/components/Adsense/AdsSquare'
import AdsWide from 'src/components/Adsense/AdsWide'
import AdsHigh from 'src/components/Adsense/AdsHigh'
import { ArticleResponse } from 'src/types/articles'
import { client } from 'src/utils/api'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'
import TagsList from 'src/components/tags/tagsList'
import Hidden from '@material-ui/core/Hidden';
import ShareButton from 'src/components/ShareButton'

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

export default function Article({ article }: { article: ArticleResponse }) {
  return (
    <Layout>
      <Head
        title={`${article.title} - ${siteTitle}`}
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
                  <DateSpan>{new Date(article.createdAt).toLocaleDateString()}</DateSpan>
                </>
                {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
                  <>
                    <UpdateIcon />
                    <DateSpan>{new Date(article.updatedAt).toLocaleDateString()}</DateSpan>
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
                  __html: `${article.body}`
                }}
                className={styles.body}
              />
              <ShareButton
                url={`https://prism-cube.com/articles/${article.id}`}
                title={`${article.title} - ${siteTitle}`}
              />
            </article>
          </ArticlePaper>
          <AdsSquare />
        </Grid>

        <Grid item xs={12} md={3}>
          <SideBar>
            <TagsList tags={article.tags} />
            <AdsHigh />
          </SideBar>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const response = await client.articles.$get()
  const paths = response.contents.map(content => `/articles/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const response = await client.articles._id(id).$get()
  return {
    props: {
      article: response,
    },
  };
};
