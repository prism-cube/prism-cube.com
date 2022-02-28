import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const HowToUsePaper = styled(Paper)`
  padding: 1rem;
`

export default function HowToUse() {
  return (
    <Layout>
      <Head
        title={`How to Use | Porch - ${siteTitle}`}
        description={`How to Use | Porch - ${siteTitle}`}
        url={`https://prism-cube.com/app/porch/how-to-use`}
      />

      <HowToUsePaper>
        <h1>Porch 使い方</h1>
        <h2>検索ワードの追加</h2>
        <p>右上の+アイコンから検索ワードを追加することができます。</p>
        <h2>検索ワードの編集</h2>
        <p>検索ワードをタップすると検索ワードを編集することができます。</p>
        <h2>検索の実行</h2>
        <p>
          検索ワードの右にある虫眼鏡アイコンをタップすると検索を実行することができます。
        </p>
        <h2>テーマの変更</h2>
        <p>
          左上の歯車アイコンからテーマ(ライト or
          ダーク)を変更することができます。
        </p>
      </HowToUsePaper>
    </Layout>
  )
}
