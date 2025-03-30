import type { IconMap, Site, SocialLink } from '@/types'

export const SITE: Site = {
  title: 'PrismCube',
  locale: 'ja-JP',
  description: '',
  href: 'https://prism-cube.com',
  articlesPerPage: 10,
  featuredArticlesCount: 2,
  featuredWorksCount: 2,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/timeline',
    label: 'Timeline',
  },
  {
    href: '/articles',
    label: 'Articles',
  },
  {
    href: '/works',
    label: 'Works',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/prism-cube',
    label: 'GitHub',
  },
  {
    href: 'https://x.com/Ta11a_dev',
    label: 'Twitter',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
  AppStore: 'lucide:apple',
  GooglePlay: 'lucide:chrome',
}
