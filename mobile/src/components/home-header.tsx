import { TouchableOpacity } from 'react-native'
import { LogOut } from 'lucide-react-native'

import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'

import { UserPhoto } from './user-photo'
import { useAuth } from '../hooks/use-auth'
import { api } from '../services/api'

import defaultUserPhotoImg from '@src/assets/userPhotoDefault.png'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack className="bg-gray-600 pt-16 pb-5 px-8 items-center gap-4">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhotoImg
        }
        alt="Imagem do Usuário"
        className="size-16"
      />

      <VStack className="flex-1">
        <Text className="text-gray-100 text-base font-regular">Olá</Text>

        <Heading className="text-gray-100 text-base font-bold">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} className="text-gray-200" size="xl" />
      </TouchableOpacity>
    </HStack>
  )
}
