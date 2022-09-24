import { MicroCMSQueries } from 'microcms-js-sdk'
import { ArticlesResponse } from '@/api/types'

export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: ArticlesResponse
  }
}
