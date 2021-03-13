import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import AdsSquare from 'src/components/Adsense/AdsSquare'

const ContactPaper = styled(Paper)`
  padding: 1rem;
`

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact - {siteTitle}</title>
      </Head>

      <ContactPaper>
        お問い合わせは<a href="https://twitter.com/tachibana_dev">Twitter</a>にお願いします。
      </ContactPaper>

      <AdsSquare />
    </Layout>
  )
}
