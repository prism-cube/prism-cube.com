import { MicroCMSQueries } from 'microcms-js-sdk'
import { ArticleResponse } from '@/api/types'

export type Methods = {
  get: {
    query?: Pick<MicroCMSQueries, 'draftKey' | 'fields' | 'depth'>
    resBody: ArticleResponse
  }
}
