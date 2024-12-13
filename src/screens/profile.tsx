import { ScrollView, TouchableOpacity } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'

import { ScreenHeader } from '../components/screen-header'
import { UserPhoto } from '../components/user-photo'
import { Input } from '../components/input'

export function Profile() {
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

          <TouchableOpacity>
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
        </Center>
      </ScrollView>
    </VStack>
  )
}
