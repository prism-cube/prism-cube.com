import Head from 'next/head'
import styled from 'styled-components'
import Layout, { siteTitle } from 'src/components/Layout'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <a href="/articles">記事一覧</a>
      </section>
    </Layout>
  )
}
