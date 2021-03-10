import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';

const Img = styled.img`
  max-width: 720px;
  max-height: 540px;
  margin-left: auto;
  margin-right: auto;
`

export default function Article({ article }) {
  return (
    <Layout>
      <Paper>
        <Head>
          <title>{article.title} - {siteTitle}</title>
        </Head>

        <h1>{article.title}</h1>
        {article.tags.map(tag => (
          <span key={tag.id}>{tag.name}</span>
        ))}
        <hr></hr>
        <p>
          <span>
            <EventNoteIcon />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </span>
          {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
            <span>
              <UpdateIcon />
              <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
            </span>
          }
        </p>
        <div>
          <Img alt={article.title} src={article.image.url} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${article.body}`,
          }}
        />
      </Paper>
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
