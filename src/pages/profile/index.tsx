import Layout from 'src/components/Layout'
import Head, { siteTitle } from 'src/components/Head'
import Link from 'next/link'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import AdsSquare from 'src/components/Adsense/AdsSquare'

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

export default function Profile() {
  return (
    <Layout>
      <Head
        title={`Profile - ${siteTitle}`}
        description={`Profile - ${siteTitle}`}
        url={`https://prism-cube.com/profile`}
      />

      <ProfilePaper>
        <ProfileArea>
          <ProfileAvatar alt="Tachibana" src="images/profile.jpg" />
          <ProfileName>Tachibana</ProfileName>
        </ProfileArea>
        <ProfileBody>
          <p>
            個人開発好きエンジニア
          </p>
        </ProfileBody>
        <div>
          <Link href="https://twitter.com/tachibana_dev">
            <a target="_blank" rel="noopener">
              <IconButton>
                <TwitterIcon />
              </IconButton>
            </a>
          </Link>
        </div>
      </ProfilePaper>
      <AdsSquare />
    </Layout>
  )
}
