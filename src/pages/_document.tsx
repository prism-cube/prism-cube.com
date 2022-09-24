import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja" className="dark">
      <Head>
        <meta
          name="format-detection"
          content="telephone=no,email=no,address=no"
        />
      </Head>
      <body className="mx-auto max-w-4xl dark:bg-ashen-900 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
