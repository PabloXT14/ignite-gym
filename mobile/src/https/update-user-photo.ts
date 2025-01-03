import { api } from '../services/api'

type UpdateUserPhotoRequest = {
  photoForm: FormData
}

export async function updateUserPhoto({ photoForm }: UpdateUserPhotoRequest) {
  await api.patch('/users/avatar', photoForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
