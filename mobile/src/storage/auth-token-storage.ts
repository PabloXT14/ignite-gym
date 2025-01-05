import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE_KEY } from './storage-config'

type AuthTokenStorageProps = {
  token: string
  refresh_token: string
}

export async function saveAuthTokenStorage({
  token,
  refresh_token,
}: AuthTokenStorageProps) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE_KEY,
    JSON.stringify({ token, refresh_token })
  )
}

export async function getAuthTokenStorage() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

  const { token, refresh_token }: AuthTokenStorageProps = storage
    ? JSON.parse(storage)
    : {}

  return { token, refresh_token }
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}
