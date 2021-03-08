import styles from '../../styles/Article.module.scss'
import Image from 'next/image'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Head from 'next/head';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 720,
      maxHeight: 540,
    },
  }),
);

export default function Article({ article }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{article.title} - PrismCube</title>
      </Head>

      <h1 className={styles.title}>{article.title}</h1>
      <hr></hr>
      <p className={styles.publishedAt}>{article.publishedAt}</p>
      <div className={classes.image}>
        <Image
          src={article.image.url}
          alt={article.image.url}
          width={article.image.width}
          height={article.image.height}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.body}`,
        }}
        className={styles.body}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(process.env.API_URL + 'article', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/article/${content.id}`);
  return {paths, fallback: false};
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(
    process.env.API_URL + 'article/' + id,
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