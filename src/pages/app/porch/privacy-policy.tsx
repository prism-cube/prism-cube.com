import Layout from 'src/components/layout'
import Head, { siteTitle } from 'src/components/head'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const PrivacyPolicyPaper = styled(Paper)`
  padding: 1rem;
`

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head
        title={`PrivacyPolicy - ${siteTitle}`}
        description={`PrivacyPolicy - ${siteTitle}`}
        url={`https://prism-cube.com/app/porch/privacy-policy`}
      />

      <PrivacyPolicyPaper>
        <h1>プライバシーポリシー</h1>
        <h2>利用者情報の取得</h2>
        <p>本アプリが利用者の個人情報を取得することはありません。</p>
        <h2>利用者情報の利用</h2>
        <p>本アプリが利用者の個人情報を利用することはありません。</p>
        <h2>利用者情報の第三者提供</h2>
        <p>本アプリが利用者の個人情報を第三者へ提供することはありません。</p>
        <h2>免責事項</h2>
        <p>利用者が本アプリを利用して生じた損害に関して、開発元は責任を負わないものとします。</p>
        <h2>問い合わせ</h2>
        <p>問い合わせで取得したメールアドレス等の情報は、問い合わせへの回答以外では使用しません。</p>
        <h2>使用ツール</h2>
        <p>
          本アプリでは、広告配信ツールとしてAdMob(Google Inc.)を使用しており、AdMobが利用者の情報を自動取得する場合があります。<br />
          取得する情報、利用目的、第三者への提供等につきましては、広告配信事業者のアプリケーション・プライバシーポリシーよりご確認ください。
        </p>
      </PrivacyPolicyPaper>
    </Layout>
  )
}
