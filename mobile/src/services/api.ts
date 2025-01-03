import axios from 'axios'
import { AppError } from '../utils/app-error'

const api = axios.create({
  baseURL: 'http://192.168.2.123:3333',
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data) {
      return Promise.reject(new AppError(error.response.data.message))
    }

    return Promise.reject(error)
  }
)

export { api }
