import type { AppProps } from 'next/app'
import AppProvider from '@/providers/AppProvider'
import '@/styles/globals.css'
import '@/styles/richeditor.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
