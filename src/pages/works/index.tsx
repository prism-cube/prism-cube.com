import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import Image from 'next/image'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core'
import Link from 'next/link'
import AdsSquare from 'src/components/adsense/ads-square'
import { WorksResponse } from 'src/types/works'
import { client } from 'src/utils/api'

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

export default function Works({ works }: { works: WorksResponse }) {
  return (
    <Layout>
      <Head
        title={`Works - ${siteTitle}`}
        description={`Works - ${siteTitle}`}
        url={`https://prism-cube.com/works`}
      />

      <Grid container spacing={2}>
        {works.contents.map(work => (
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
      <AdsSquare />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const response = await client.works.$get()
  return {
    props: {
      works: response,
    },
  };
};
