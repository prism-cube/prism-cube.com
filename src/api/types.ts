import {
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSImage,
  MicroCMSContentId,
  MicroCMSDate,
} from 'microcms-js-sdk'

export type Article = {
  title: string
  body: string
  tags: Tag[]
  image: MicroCMSImage
} & MicroCMSContentId &
  MicroCMSDate

export type Tag = {
  name: string
  image: MicroCMSImage
  icon?: MicroCMSImage
  sort?: number
}

export type Work = {
  title: string
  description: string
  platform: string[]
  techs: Tech[]
  url?: string
  githubUrl?: string
  appStoreUrl?: string
  googlePlayUrl?: string
  body?: string
  image?: MicroCMSImage
}

export type Tech = {
  name: string
  image: MicroCMSImage
}

export type Profile = {
  name: string
  body: string
  image: MicroCMSImage
}

export type ArticleResponse = Article & MicroCMSObjectContent

export type ArticlesResponse = MicroCMSListResponse<Article>

export type TagsResponse = MicroCMSListResponse<Tag>

export type WorksResponse = MicroCMSListResponse<Work>

export type ProfileResponse = Profile & MicroCMSObjectContent
