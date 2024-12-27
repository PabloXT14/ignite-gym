import { createContext, useState, type ReactNode } from 'react'
import type { UserDTO } from '../dtos/user-dto'

export type AuthContextData = {
  user: UserDTO
  signIn: (email: string, password: string) => void
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

  function signIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
