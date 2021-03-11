import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';

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

export default function Profile() {
  return (
    <Layout>
      <Head>
        <title>Profile - {siteTitle}</title>
      </Head>

      <ProfilePaper>
        <ProfileArea>
          <ProfileAvatar alt="Tachibana" src="images/profile.jpg" />
          <ProfileName>Tachibana</ProfileName>
        </ProfileArea>
      </ProfilePaper>
    </Layout>
  )
}
