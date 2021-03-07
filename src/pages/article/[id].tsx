import styles from '../../styles/Article.module.scss'
import Image from 'next/image'

export default function Article({ article }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.publishedAt}>{article.publishedAt}</p>
      <Image
        src={article.image.url}
        alt={article.image.url}
        width={article.image.width}
        height={article.image.height}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.body}`,
        }}
        className={styles.body}
      />
    </main>
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