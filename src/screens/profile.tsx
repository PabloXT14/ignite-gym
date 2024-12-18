import { ScrollView } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'

import { ScreenHeader } from '../components/screen-header'
import { UserPhoto } from '../components/user-photo'

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
        </Center>
      </ScrollView>
    </VStack>
  )
}
