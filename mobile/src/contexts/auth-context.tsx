import { createContext, useState, type ReactNode } from 'react'
import type { UserDTO } from '../dtos/user-dto'

export type AuthContextData = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({
    id: '1',
    name: 'John Doe',
    email: 'FyZ0F@example.com',
    avatar: 'https://github.com/pabloxt14.png',
  })

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
