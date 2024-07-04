import axios, { InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) throw new Error(`BASE_URL must be set`)

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  withCredentials: true,
})

const onRequestFulfilled: (value: any) => any | Promise<any> = (
  config: InternalAxiosRequestConfig,
) => {
  return config
}

const onRequestRejected: (error: unknown) => unknown = (error: unknown) => Promise.reject(error)

apiClient.interceptors.request.use(onRequestFulfilled, onRequestRejected)

export { apiClient }
