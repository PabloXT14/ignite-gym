import { api } from '../services/api'

type CreateUserRequest = {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserRequest) {
  const response = await api.post('/users', {
    name,
    email,
    password,
  })

  return response.data
}
