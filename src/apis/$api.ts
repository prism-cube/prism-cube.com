/* eslint-disable */
import { AspidaClient, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './articles'
import { Methods as Methods1 } from './articles/_id@string'
import { Methods as Methods2 } from './profile'
import { Methods as Methods3 } from './tags'
import { Methods as Methods4 } from './tags/_id@string'
import { Methods as Methods5 } from './works'
import { Methods as Methods6 } from './works/_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/articles'
  const PATH1 = '/profile'
  const PATH2 = '/tags'
  const PATH3 = '/works'
  const GET = 'GET'

  return {
    articles: {
      _id: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
            fetch<Methods1['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
            fetch<Methods1['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      },
      get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
        fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
        fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    profile: {
      get: (option?: { query?: Methods2['get']['query'], config?: T }) =>
        fetch<Methods2['get']['resBody']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { query?: Methods2['get']['query'], config?: T }) =>
        fetch<Methods2['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    tags: {
      _id: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          get: (option?: { query?: Methods4['get']['query'], config?: T }) =>
            fetch<Methods4['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { query?: Methods4['get']['query'], config?: T }) =>
            fetch<Methods4['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods4['get']['query'] }) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      },
      get: (option?: { query?: Methods3['get']['query'], config?: T }) =>
        fetch<Methods3['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { query?: Methods3['get']['query'], config?: T }) =>
        fetch<Methods3['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods3['get']['query'] }) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    works: {
      _id: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`

        return {
          get: (option?: { query?: Methods6['get']['query'], config?: T }) =>
            fetch<Methods6['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { query?: Methods6['get']['query'], config?: T }) =>
            fetch<Methods6['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods6['get']['query'] }) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      },
      get: (option?: { query?: Methods5['get']['query'], config?: T }) =>
        fetch<Methods5['get']['resBody']>(prefix, PATH3, GET, option).json(),
      $get: (option?: { query?: Methods5['get']['query'], config?: T }) =>
        fetch<Methods5['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
