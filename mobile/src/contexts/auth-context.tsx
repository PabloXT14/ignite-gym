import { createContext, type ReactNode } from 'react'
import type { UserDTO } from '../dtos/user-dto'

export type AuthContextData = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
          avatar: 'https://github.com/pabloxt14.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
