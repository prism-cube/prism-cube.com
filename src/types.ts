export type Site = {
  title: string
  description: string
  href: string
  locale: string
  articlesPerPage: number
  featuredArticlesCount: number
  featuredWorksCount: number
}

export type SocialLink = {
  href: string
  label: string
}

export type IconMap = {
  [key: string]: string
}
