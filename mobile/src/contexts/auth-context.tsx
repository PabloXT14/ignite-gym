import { createContext } from 'react'
import type { UserDTO } from '../dtos/user-dto'

export type AuthContextData = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)
