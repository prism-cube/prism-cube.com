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
import Hidden from '@material-ui/core/Hidden';

const ArticlePaper = styled(Paper)`
  padding: 1rem;
`
const DateSpan = styled.span`
  margin-right: 0.5rem;
  vertical-align: top;
`
const TagSpan = styled.span`
  padding-left: 0.5rem;
  vertical-align: super;
`
const Img = styled.div`
  max-width: 720px;
  max-height: 540px;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
`
const TagsPaper = styled(Paper)`
  padding: 1rem;
`
const HeadingSpan = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
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
        canonicalUrl={`https://prism-cube.com/articles/${article.id}`}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <AdsWide />
          <ArticlePaper>
            <article>
              <h1>{article.title}</h1>
              <div>
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
              </div>
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
            </article>
          </ArticlePaper>
          <AdsSquare />
        </Grid>

        <Grid item xs={12} md={3}>
          <SideBar>
            <TagsPaper>
              <HeadingSpan>Tags</HeadingSpan>
              <Grid container spacing={1}>
                {article.tags.map(tag => (
                  <Grid item key={tag.id} xs={6}>
                    <Image
                      src={tag.icon.url}
                      alt={tag.name}
                      width={30}
                      height={30}
                    />
                    <TagSpan>{tag.name}</TagSpan>
                  </Grid>
                ))}
              </Grid>
            </TagsPaper>

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
