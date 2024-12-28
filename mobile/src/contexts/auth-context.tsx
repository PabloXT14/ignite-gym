import { createContext, useState, type ReactNode } from 'react'

import type { UserDTO } from '../dtos/user-dto'

import { makeSignIn } from '../https/make-sign-in'

export type AuthContextData = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { user } = await makeSignIn({ email, password })

      if (user) {
        setUser(user)
      }
    } catch (error) {
      throw error
    }
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
