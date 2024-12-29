import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE_KEY } from './storage-config'

export async function saveAuthTokenStorage(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export async function getAuthTokenStorage() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

  return token
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}
