import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '@/libs/gtag'
import { config } from '@/constants/config'

export default function Document() {
  return (
    <Html lang="ja" className="dark">
      <Head>
        <meta
          name="format-detection"
          content="telephone=no,email=no,address=no"
        />
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });`,
              }}
            />
          </>
        )}
        {/* Google AdSense */}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.GOOGLE_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          ></script>
        )}
      </Head>
      <body className="mx-auto max-w-4xl dark:bg-ashen-900 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
