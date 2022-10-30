import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import AppProvider from '@/providers/AppProvider'
import * as gtag from '@/libs/gtag'
import '@/styles/globals.css'
import '@/styles/richeditor.css'

function MyApp({ Component, pageProps }: AppProps) {
  // Google Analyticsをページ遷移時にも対応させる
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
