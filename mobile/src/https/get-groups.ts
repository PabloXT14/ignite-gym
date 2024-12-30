import { api } from '../services/api'

export async function getGroups() {
  const response = await api.get('/groups')

  const groups = response.data as string[]

  return groups
}
