import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const ProfilePaper = styled(Paper)`
  padding: 1rem;
`

export default function Profile() {
  return (
    <Layout>
      <Head>
        <title>Profile - {siteTitle}</title>
      </Head>

      <ProfilePaper>
        
      </ProfilePaper>
    </Layout>
  )
}
