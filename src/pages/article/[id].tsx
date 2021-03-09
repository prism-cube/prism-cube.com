import styles from 'src/styles/Article.module.scss'
import Image from 'next/image'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    image: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 720,
      maxHeight: 540,
    },
    tag: {
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "3px",
      padding: 2,
      marginRight: '10px',
    },
    date: {
      marginRight: '10px',
      verticalAlign: 'super',
    },
  }),
);

export default function Article({ article }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Head>
        <title>{article.title} - PrismCube</title>
      </Head>

      <h1 className={styles.title}>{article.title}</h1>
      {article.tags.map(tag => (
        <span key={tag.id} className={classes.tag}>{tag.name}</span>
      ))}
      <hr></hr>
      <p>
        <span>
          <EventNoteIcon />
          <span className={classes.date}>{new Date(article.createdAt).toLocaleDateString()}</span>
        </span>
        {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
          <span>
            <UpdateIcon />
            <span className={classes.date}>{new Date(article.updatedAt).toLocaleDateString()}</span>
          </span>
        }
      </p>
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
    </Paper>
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