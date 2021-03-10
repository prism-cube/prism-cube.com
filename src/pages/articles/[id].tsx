import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import Css from 'src/styles/article.module.css'

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
              alt={article.image.url}
              width={article.image.width}
              height={article.image.height}
            />
          </Img>
          <div
            dangerouslySetInnerHTML={{
              __html: `${article.body}`,
            }}
          />
        </article>
      </ArticlePaper>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(process.env.API_URL + 'articles', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/articles/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(
    process.env.API_URL + 'articles/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      article: data,
    },
  };
};
