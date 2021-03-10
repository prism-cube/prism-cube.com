import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const WorksPaper = styled(Paper)`
  padding: 1rem;
`

export default function Works() {
  return (
    <Layout>
      <Head>
        <title>Works - {siteTitle}</title>
      </Head>

      <WorksPaper>
        
      </WorksPaper>
    </Layout>
  )
}
