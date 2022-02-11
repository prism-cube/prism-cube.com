import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import Image from 'next/image'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkIcon from '@material-ui/icons/Link'
import { Appstore, Googleplay } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import AdsSquare from 'src/components/adsense/ads-square'
import { WorksResponse } from 'src/types/works'
import { client } from 'src/utils/api'

const PaperItem = styled(Paper)`
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
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
  padding: 0.25rem;
`
const WorkDescription = styled.p`
  margin: 0px;
  padding-bottom: 0.5rem;
`
const TechImages = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`
const TechImage = styled.span`
  margin-right: 0.5rem;
`
const IconArea = styled.div``
const PlatformSpan = styled.span`
  padding: 0.1rem 0.25rem 0.1rem 0.25rem;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
  margin-left: 0.25rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.54);
  color: rgba(0, 0, 0, 0.54);
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
        {works.contents.map((work) => (
          <Grid key={work.id} item xs={12} sm={6}>
            <PaperItem>
              <WorkTitle variant="h5">{work.title}</WorkTitle>

              <WorkDescription>{work.description}</WorkDescription>

              {work.platform.map((p) => (
                <PlatformSpan key={p}>{p}</PlatformSpan>
              ))}

              <IconArea>
                {work.url && (
                  <Link href={work.url}>
                    <a target="_blank" rel="noopener">
                      <IconButton>
                        <LinkIcon />
                      </IconButton>
                    </a>
                  </Link>
                )}
                {work.appStoreUrl && (
                  <Link href={work.appStoreUrl}>
                    <a target="_blank" rel="noopener">
                      <IconButton>
                        <Appstore />
                      </IconButton>
                    </a>
                  </Link>
                )}
                {work.googlePlayUrl && (
                  <Link href={work.googlePlayUrl}>
                    <a target="_blank" rel="noopener">
                      <IconButton>
                        <Googleplay />
                      </IconButton>
                    </a>
                  </Link>
                )}
                {work.githubUrl && (
                  <Link href={work.githubUrl}>
                    <a target="_blank" rel="noopener">
                      <IconButton>
                        <GitHubIcon />
                      </IconButton>
                    </a>
                  </Link>
                )}
              </IconArea>

              <TechImages>
                {work.techs.map((tech) => (
                  <Tooltip key={tech.id} title={tech.name}>
                    <TechImage>
                      <Image
                        src={tech.image.url}
                        alt={tech.image.url}
                        width="30"
                        height="30"
                      />
                    </TechImage>
                  </Tooltip>
                ))}
              </TechImages>
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
      works: response
    }
  }
}
