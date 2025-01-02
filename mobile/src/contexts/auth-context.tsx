import { createContext, useEffect, useState, type ReactNode } from 'react'

import type { UserDTO } from '../dtos/user-dto'

import { api } from '../services/api'
import { makeSignIn } from '../https/make-sign-in'

import {
  getUserStorage,
  removeUserStorage,
  saveUserStorage,
} from '../storage/user-storage'
import {
  getAuthTokenStorage,
  removeAuthTokenStorage,
  saveAuthTokenStorage,
} from '../storage/auth-token-storage'

export type AuthContextData = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }

  async function storageUserAndToken(useData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)

      await saveUserStorage(useData)
      await saveAuthTokenStorage(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { user, token } = await makeSignIn({ email, password })

      if (user && token) {
        await storageUserAndToken(user, token)
        await updateUserAndToken(user, token)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)

      await removeUserStorage()
      await removeAuthTokenStorage()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await saveUserStorage(userUpdated)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await getUserStorage()
      const token = await getAuthTokenStorage()

      if (userLogged && token) {
        await updateUserAndToken(userLogged, token)
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
        signOut,
        updateUserProfile,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
