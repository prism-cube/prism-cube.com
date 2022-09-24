import api from '@/api/$api'
import aspida from '@aspida/fetch'
import { config } from '@/constants/config'

const fetchConfig = {
  headers: {
    'X-MICROCMS-API-KEY': config.API_KEY,
  },
  baseURL: config.API_URL,
}

export const client = api(aspida(fetch, fetchConfig))
