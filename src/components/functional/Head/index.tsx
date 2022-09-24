import NextHead from 'next/head'
import { config } from '@/constants/config'

interface HeadProps {
  title?: string
  description?: string
  url?: string
  ogImage?: string
}

export const Head: React.FC<HeadProps> = ({
  title = '',
  description = '',
  url = '',
  ogImage = config.SITE_URL + '/ogp.jpg',
}) => {
  return (
    <NextHead>
      <title>
        {title === '' ? config.SITE_NAME : `${title} - ${config.SITE_NAME}`}
      </title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${title} - ${config.SITE_NAME}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={config.SITE_URL + url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${config.TWITTER_ID}`} />

      <link rel="canonical" href={config.SITE_URL + url} />
    </NextHead>
  )
}
