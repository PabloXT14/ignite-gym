import { api } from '../services/api'

type UpdateUserRequest = {
  name?: string | null
  password?: string | null
  old_password?: string | null
}

export async function updateUser({
  name,
  password,
  old_password,
}: UpdateUserRequest) {
  await api.put('/users', { name, password, old_password })
}
