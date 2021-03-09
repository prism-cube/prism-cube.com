import Link from 'next/link';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Head from 'next/head';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 720,

      marginBottom: 15,
      cursor: 'pointer',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
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

export default function Articles({ articles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>Articles - PrismCube</title>
      </Head>

      {articles.map(article => (
        <Link key={article.id} href={`article/${article.id}`}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={article.image.url} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body2" color="textSecondary">
                    <span>
                      <EventNoteIcon fontSize="small" />
                      <span className={classes.date}>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </span>
                    {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
                      <span>
                        <UpdateIcon fontSize="small" />
                        <span className={classes.date}>{new Date(article.updatedAt).toLocaleDateString()}</span>
                      </span>
                    }
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      {article.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      {article.tags.map(tag => (
                        <span key={tag.id} className={classes.tag}>{tag.name}</span>
                      ))}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(process.env.API_URL + 'article', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      articles: data.contents,
    },
  };
};
