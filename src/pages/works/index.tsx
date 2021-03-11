import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip';

const PaperItem = styled(Paper)`
`
const PaperItemA = styled.a`
  text-decoration: none;
  color: inherit;
`
const WorkImage = styled(Image)`
  border-radius: 0.25rem;
`
const WorkTitle = styled(Typography)`
  font-weight: bold;
`
const WorkDescription = styled(Typography)`
  font-size: 1vw;
`
const WorkText = styled.span`
  text-align: center;
`
const TechImages = styled.div`
`
const TechImage = styled.span`
  margin-right: 0.5rem;
`

export default function Works({ works }) {
  return (
    <Layout>
      <Head>
        <title>Works - {siteTitle}</title>
      </Head>

      <Grid container spacing={2}>
        {works.map(work => (
          <Grid key={work.id} item xs={6}>
            <PaperItem>
              <PaperItemA href={`works/${work.id}`}>
                <WorkImage
                  src={work.image.url}
                  alt={work.image.url}
                  width={work.image.width}
                  height={work.image.height}
                />
                <WorkText>
                  <WorkTitle variant="h6">{work.title}</WorkTitle>
                  <WorkDescription>{work.description}</WorkDescription>
                </WorkText>
              </PaperItemA>
            </PaperItem>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(process.env.API_URL + 'works', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      works: data.contents,
    },
  };
};
