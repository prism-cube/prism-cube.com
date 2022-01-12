import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import Link from 'next/link'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import AdsSquare from 'src/components/adsense/ads-square'
import { ProfileResponse } from 'src/types/profile'
import { client } from 'src/utils/api'
import styles from 'src/styles/profile.module.scss'

const ProfilePaper = styled(Paper)`
  padding: 1rem;
`
const ProfileAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-right: 1rem;
`
const ProfileArea = styled.div`
  display: flex;
`
const ProfileName = styled.h1`
  font-size: 2.25rem;
`
const ProfileBody = styled.div`
  padding: 1rem;
`
const LinkArea = styled.div`
  padding-top: 0.5rem;
  padding-left: 0.5rem;
`

export default function Profile({ profile }: {profile: ProfileResponse}) {
  return (
    <Layout>
      <Head
        title={`Profile - ${siteTitle}`}
        description={`Profile - ${siteTitle}`}
        url={`https://prism-cube.com/profile`}
      />

      <ProfilePaper>
        <ProfileArea>
          <ProfileAvatar alt={profile.name} src={profile.image.url} />
          <ProfileName>{profile.name}</ProfileName>
        </ProfileArea>
        <LinkArea>
          <Link href={profile.twitterUrl}>
            <a target="_blank" rel="noopener">
              <IconButton>
                <TwitterIcon />
              </IconButton>
            </a>
          </Link>
          <Link href={profile.githubUrl}>
            <a target="_blank" rel="noopener">
              <IconButton>
                <GitHubIcon />
              </IconButton>
            </a>
          </Link>
        </LinkArea>
        <ProfileBody
          dangerouslySetInnerHTML={{
            __html: `${profile.body}`
          }}
          className={styles.body}
        />
      </ProfilePaper>
      <AdsSquare />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const response = await client.profile.$get()
  return {
    props: {
      profile: response,
    },
  };
};
