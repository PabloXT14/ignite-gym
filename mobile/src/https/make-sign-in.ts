import { api } from '../services/api'
import type { UserDTO } from '../dtos/user-dto'

type MakeSignInRequest = {
  email: string
  password: string
}

type MakeSignInResponse = {
  user: UserDTO
}

export async function makeSignIn({
  email,
  password,
}: MakeSignInRequest): Promise<MakeSignInResponse> {
  const response = await api.post('/sessions', { email, password })

  return {
    user: response.data.user,
  }
}
