import { api } from '../services/api'

export async function getHistory() {
  const response = await api.get('/history')

  const history = response.data

  return { history }
}
