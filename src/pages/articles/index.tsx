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
  width: 128px;
  height: 96px;
`

export default function Articles({ articles }) {
  return (
    <Layout>
      <Head>
        <title>Articles - {siteTitle}</title>
      </Head>

      {articles.map(article => (
        <Link key={article.id} href={`articles/${article.id}`}>
          <Paper>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase>
                  <Img alt={article.title} src={article.image.url} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body2" color="textSecondary">
                      <span>
                        <EventNoteIcon fontSize="small" />
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </span>
                      {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
                        <span>
                          <UpdateIcon fontSize="small" />
                          <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
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
                        <span key={tag.id}>{tag.name}</span>
                      ))}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Link>
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(process.env.API_URL + 'articles', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      articles: data.contents,
    },
  };
};
