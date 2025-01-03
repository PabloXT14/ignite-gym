import { api } from '../services/api'

import type { UserDTO } from '../dtos/user-dto'

type UpdateUserPhotoRequest = {
  photoForm: FormData
}

type UpdateUserPhotoResponse = Omit<UserDTO, 'id'>

export async function updateUserPhoto({ photoForm }: UpdateUserPhotoRequest) {
  const response = await api.patch('/users/avatar', photoForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data as UpdateUserPhotoResponse
}
