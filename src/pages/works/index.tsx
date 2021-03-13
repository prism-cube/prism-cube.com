import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core'
import Link from 'next/link'
import GoogleAds from 'react-google-ads';

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
const WorkDescription = styled.p`
  margin: 0px;
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
              <Link href={`/works/${work.id}`} passHref>
                <PaperItemA>
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
              </Link>
            </PaperItem>
          </Grid>
        ))}
      </Grid>
      <GoogleAds
        client="ca-pub-7261406872445625"
        slot="1210854134"
        className="adsbygoogle"
        format="auto"
        style={{display: 'block'}}
      />
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
