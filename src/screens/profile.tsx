import { ScrollView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'

import { ScreenHeader } from '../components/screen-header'
import { UserPhoto } from '../components/user-photo'
import { Input } from '../components/input'
import { Button } from '../components/button'

export function Profile() {
  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (photoSelected.canceled) return

    console.log(photoSelected.assets[0])
  }

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerClassName="pb-9">
        <Center className="mt-6 px-10">
          <UserPhoto
            source={'https://github.com/pabloxt14.png'}
            alt="Imagem do Usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="text-green-500 text-base font-bold mt-2 mb-8">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center className="w-full gap-4">
            <Input placeholder="Nome" className="bg-gray-600" />
            <Input
              value="johndoe@email.com"
              className="bg-gray-600"
              isReadOnly
            />
          </Center>

          <Heading className="self-start text-gray-200 text-base font-bold mt-12 mb-2">
            Alterar senha
          </Heading>

          <Center className="w-full gap-4">
            <Input
              placeholder="Senha antiga"
              className="bg-gray-600"
              secureTextEntry
            />

            <Input
              placeholder="Nova senha"
              className="bg-gray-600"
              secureTextEntry
            />

            <Input
              placeholder="Confirmar a nova senha"
              className="bg-gray-600"
              secureTextEntry
            />

            <Button title="Atualizar" className="mt-8" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
