import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import AdsSquare from 'src/components/adsense/ads-square'

const StatusCodeH1 = styled.h1`
  display: inline-block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0;
  padding: 0 0 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
`
const MessageDiv = styled.div`
  display:inline-block;
  text-align:left;
  line-height:49px;
  height:49px;
  vertical-align:middle;
`
const MessageH2 = styled.h2`
  font-size:14px;
  font-weight:normal;
  line-height:inherit;
  margin:0;
  padding:0;
`
const CenterDiv = styled.div`
  color:#000;
  font-family:-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
  height:100vh;
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

export default function Custom404() {
  return (
    <Layout>
      <Head
        title={`404 - ${siteTitle}`}
        description={`404 - ${siteTitle}`}
        url={`https://prism-cube.com/404`}
      />

      <CenterDiv>
        <StatusCodeH1>
          404
        </StatusCodeH1>
        <MessageDiv>
          <MessageH2>
            This page could not be found.
          </MessageH2>
        </MessageDiv>
      </CenterDiv>
      
    </Layout>
  )
}
