import { MicroCMSQueries } from 'microcms-js-sdk'
import { WorksResponse } from '@/api/types'

export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: WorksResponse
  }
}
