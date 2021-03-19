import Layout from 'src/components/layout-new'
import Head, { siteTitle } from 'src/components/head-meta'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import AdsSquare from 'src/components/adsense/ads-square'

const ContactPaper = styled(Paper)`
  padding: 1rem;
`

export default function Contact() {
  return (
    <Layout>
      <Head
        title={`Contact - ${siteTitle}`}
        description={`Contact - ${siteTitle}`}
        url={`https://prism-cube.com/contact`}
      />

      <ContactPaper>
        お問い合わせは<a href="https://twitter.com/tachibana_dev">Twitter</a>にお願いします。
      </ContactPaper>

      <AdsSquare />
    </Layout>
  )
}
