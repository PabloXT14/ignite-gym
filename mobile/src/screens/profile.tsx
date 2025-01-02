import { useState } from 'react'

import { Alert, ScrollView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import { useToast } from '@/components/ui/toast'

import { ScreenHeader } from '../components/screen-header'
import { UserPhoto } from '../components/user-photo'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { ToastMessage } from '../components/toast-message'
import { useAuth } from '../hooks/use-auth'

const profileFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras' }),
  email: z
    .string({ required_error: 'O e-mail é obrigatório' })
    .email({ message: 'Formato de e-mail inválido' }),
  old_password: z.string(),
  new_password: z
    .string()
    .min(6, { message: 'A nova senha precisa ter pelo menos 6 letras' }),
  confirm_new_password: z
    .string()
    .min(6, { message: 'A nova senha precisa ter pelo menos 6 letras' }),
})

type ProfileFormData = z.infer<typeof profileFormSchema>

const MAX_IMAGE_SIZE_MB = 5

export function Profile() {
  const { user } = useAuth()

  const { control, handleSubmit } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const [userPhoto, setUserPhoto] = useState('https://github.com/pabloxt14.png')

  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      const photoUri = photoSelected.assets[0].uri

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }

        if (
          photoInfo.size &&
          photoInfo.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB
        ) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Imagem muito grande"
                description={`Escolha uma de até ${MAX_IMAGE_SIZE_MB}MB.`}
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserPhoto(photoUri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Erro ao escolher a foto',
        'Tente novamente ou contate o suporte se o problema persistir.'
      )
    }
  }

  async function handleProfileUpdate(data: ProfileFormData) {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao atualizar perfil"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerClassName="pb-9">
        <Center className="mt-6 px-10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Imagem do Usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="text-green-500 text-base font-bold mt-2 mb-8">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center className="w-full gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  className="bg-gray-600"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  className="bg-gray-600"
                  isReadOnly
                />
              )}
            />
          </Center>

          <Heading className="self-start text-gray-200 text-base font-bold mt-12 mb-2">
            Alterar senha
          </Heading>

          <Center className="w-full gap-4">
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  className="bg-gray-600"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  className="bg-gray-600"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_new_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirmar a nova senha"
                  className="bg-gray-600"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />

            <Button
              title="Atualizar"
              className="mt-8"
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
