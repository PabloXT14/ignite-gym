import axios, { type AxiosInstance } from 'axios'

import { AppError } from '../utils/app-error'
import { getAuthTokenStorage } from '../storage/auth-token-storage'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.2.123:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response,
    async requestError => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response?.data?.message === 'token.expired' ||
          requestError.response?.data?.message === 'token.invalid'
        ) {
          const { refresh_token } = await getAuthTokenStorage()

          if (!refresh_token) {
            signOut()
            return Promise.reject(requestError)
          }
        }

        // Desloga o usuário por algum erro de autorização qualquer que não esteja relacionado ao token
        signOut()
      }

      if (requestError.response?.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      }

      return Promise.reject(requestError)
    }
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
