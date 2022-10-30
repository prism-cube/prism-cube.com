export const config = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? '',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  TWITTER_ID: process.env.NEXT_PUBLIC_TWITTER_ID ?? '',
  GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID ?? '',
  API_KEY: process.env.API_KEY ?? '',
  API_URL: process.env.API_URL ?? '',
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
  GOOGLE_ADSENSE_PUBLISHER_ID:
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID ?? '',
  LIST_LIMIT: 10,
}
