import { createContext, useEffect, useState, type ReactNode } from 'react'

import type { UserDTO } from '../dtos/user-dto'

import { makeSignIn } from '../https/make-sign-in'

import { getUserStorage, saveUserStorage } from '../storage/user-storage'

export type AuthContextData = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { user } = await makeSignIn({ email, password })

      if (user) {
        setUser(user)
        saveUserStorage(user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await getUserStorage()

      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
