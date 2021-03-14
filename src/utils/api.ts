import aspida from '@aspida/fetch'
import api from 'src/apis/$api'

const fetchConfig: Required<Parameters<typeof aspida>>[1] = {
  baseURL: process.env.API_URL,
  throwHttpErrors: true,
  headers: {
    "X-API-KEY": process.env.API_KEY ?? "",
  },
};

export const client = api(aspida(fetch, fetchConfig));