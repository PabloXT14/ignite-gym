import AsyncStorage from '@react-native-async-storage/async-storage'

import type { UserDTO } from '../dtos/user-dto'
import { USER_STORAGE_KEY } from './storage-config'

export async function saveUserStorage(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export async function getUserStorage() {
  const storage = await AsyncStorage.getItem(USER_STORAGE_KEY)

  const user: UserDTO = storage ? JSON.parse(storage) : {}

  return user
}

export async function removeUserStorage() {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}
