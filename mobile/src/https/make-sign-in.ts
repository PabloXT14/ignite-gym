import { api } from '../services/api'
import type { UserDTO } from '../dtos/user-dto'

type MakeSignInRequest = {
  email: string
  password: string
}

type MakeSignInResponse = {
  user: UserDTO
  token: string
}

export async function makeSignIn({
  email,
  password,
}: MakeSignInRequest): Promise<MakeSignInResponse> {
  const { data } = await api.post('/sessions', { email, password })

  if (data.user && data.token) {
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`
  }

  return {
    user: data.user,
    token: data.token,
  }
}
