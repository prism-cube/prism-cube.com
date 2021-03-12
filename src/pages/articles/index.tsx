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

const PaperItem = styled(Paper)`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
`
const PaperItemA = styled.a`
  text-decoration: none;
  color: inherit;
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

export default function Articles({ articles }) {
  return (
    <Layout>
      <Head>
        <title>Articles - {siteTitle}</title>
      </Head>

      {articles.map(article => (
        <PaperItem key={article.id}>
          <Link href={`/articles/${article.id}`} passHref>
            <PaperItemA>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase>
                    <Image alt={article.title} src={article.image.url} width="160" height="90" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2" color="textSecondary">
                        <>
                          <EventNoteIcon fontSize="small" />
                          <DateSpan>{new Date(article.createdAt).toLocaleDateString()}</DateSpan>
                        </>
                        {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
                          <>
                            <UpdateIcon fontSize="small" />
                            <DateSpan>{new Date(article.updatedAt).toLocaleDateString()}</DateSpan>
                          </>
                        }
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        {article.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {article.tags.map(tag => (
                          <TagSpan key={tag.id}>{tag.name}</TagSpan>
                        ))}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PaperItemA>
          </Link>
        </PaperItem>
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
