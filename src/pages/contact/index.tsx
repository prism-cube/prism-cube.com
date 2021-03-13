import Layout, { siteTitle } from 'src/components/Layout'
import Head from 'next/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import GoogleAds from 'react-google-ads';

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

      <GoogleAds
        client="ca-pub-7261406872445625"
        slot="1210854134"
        className="adsbygoogle"
        format="auto"
        style={{display: 'block'}}
      />
    </Layout>
  )
}
