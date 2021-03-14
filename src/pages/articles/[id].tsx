import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import styles from 'src/styles/article.module.scss'
import AdsSquare from 'src/components/Adsense/AdsSquare'
import AdsWide from 'src/components/Adsense/AdsWide'
import { ArticleResponse } from 'src/types/article'
import { client } from 'src/utils/api'

const ArticlePaper = styled(Paper)`
  padding: 1rem;
`
const DateSpan = styled.span`
  margin-right: 0.5rem;
  vertical-align: top;
`
const TagSpan = styled.span`
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`
const Img = styled.div`
  max-width: 720px;
  max-height: 540px;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
`

export default function Article({ article }) {
  return (
    <Layout>
      <Head>
        <title>{article.title} - {siteTitle}</title>
      </Head>

      <AdsWide />
      <ArticlePaper>
        <article>
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
          <h1>{article.title}</h1>
          {article.tags.map(tag => (
            <TagSpan key={tag.id}>{tag.name}</TagSpan>
          ))}
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
