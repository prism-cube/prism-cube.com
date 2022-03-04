import React, { useEffect, useState } from 'react'
import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import Image from 'next/image'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import { Typography } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkIcon from '@material-ui/icons/Link'
import { Appstore, Googleplay } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import AdsSquare from 'src/components/adsense/ads-square'
import { WorkResponse, WorksResponse } from 'src/types/works'
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
  margin-right: 0.25rem;
  margin-left: 0.25rem;
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
const PlatformFormGroup = styled(FormGroup)`
  display: block;
  text-align: center;
  padding-bottom: 0.5rem;
`

const Platform = {
  WEB: { name: 'web', label: 'Web' },
  IOS: { name: 'ios', label: 'App(iOS)' },
  ANDROID: { name: 'android', label: 'App(Android)' }
} as const

export default function Works({ works }: { works: WorksResponse }) {
  const router = useRouter()
  const query = router.query

  const [stateWorks, setStateWorks] = useState(works.contents)

  const [statePlatform, setStatePlatform] = useState({
    web: true,
    ios: true,
    android: true
  })

  const platformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatePlatform({
      ...statePlatform,
      [event.target.name]: event.target.checked
    })
    let web = statePlatform.web
    if (event.target.name === Platform.WEB.name) web = event.target.checked
    let ios = statePlatform.ios
    if (event.target.name === Platform.IOS.name) ios = event.target.checked
    let android = statePlatform.android
    if (event.target.name === Platform.ANDROID.name)
      android = event.target.checked

    worksFilter(web, ios, android)

    let query = []
    if (web) query.push(Platform.WEB.name)
    if (ios) query.push(Platform.IOS.name)
    if (android) query.push(Platform.ANDROID.name)

    if (query.length > 0 && query.length < Object.values(Platform).length) {
      Router.replace({
        pathname: '/works',
        query: {
          platform: query.join(',')
        }
      })
    } else {
      Router.replace('/works')
    }
  }

  const worksFilter = (web: boolean, ios: boolean, android: boolean) => {
    let newState: WorkResponse[] = []
    for (const work of works.contents) {
      if (
        (web && work.platform.includes(Platform.WEB.label)) ||
        (ios && work.platform.includes(Platform.IOS.label)) ||
        (android && work.platform.includes(Platform.ANDROID.label))
      ) {
        newState.push(work)
      }
    }
    if (newState.length === 0) newState = works.contents
    setStateWorks(newState)
  }

  useEffect(() => {
    const { platform } = query
    if (!router.isReady || platform == undefined) {
      return
    }
    const p = platform.toString().split(',')
    setStatePlatform({
      web: p.includes(Platform.WEB.name),
      ios: p.includes(Platform.IOS.name),
      android: p.includes(Platform.ANDROID.name)
    })
    worksFilter(
      p.includes(Platform.WEB.name),
      p.includes(Platform.IOS.name),
      p.includes(Platform.ANDROID.name)
    )
  }, [query, router])

  return (
    <Layout>
      <Head
        title={`Works - ${siteTitle}`}
        description={`Works - ${siteTitle}`}
        url={`https://prism-cube.com/works`}
      />

      <PlatformFormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={statePlatform.web}
              onChange={platformChange}
              name={Platform.WEB.name}
              color="primary"
            />
          }
          label={Platform.WEB.label}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={statePlatform.ios}
              onChange={platformChange}
              name={Platform.IOS.name}
              color="primary"
            />
          }
          label={Platform.IOS.label}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={statePlatform.android}
              onChange={platformChange}
              name={Platform.ANDROID.name}
              color="primary"
            />
          }
          label={Platform.ANDROID.label}
        />
      </PlatformFormGroup>

      <Grid container spacing={2}>
        {stateWorks.map((work) => (
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
