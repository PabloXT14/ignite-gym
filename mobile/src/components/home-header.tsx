import { LogOut } from 'lucide-react-native'

import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'

import { UserPhoto } from './user-photo'

export function HomeHeader() {
  return (
    <HStack className="bg-gray-600 pt-16 pb-5 px-8 items-center gap-4">
      <UserPhoto
        source={'https://github.com/pabloxt14.png'}
        alt="Imagem do Usuário"
        className="size-16"
      />

      <VStack className="flex-1">
        <Text className="text-gray-100 text-base font-regular">Olá</Text>

        <Heading className="text-gray-100 text-base font-bold">
          John Doe
        </Heading>
      </VStack>

      <Icon as={LogOut} className="text-gray-200" size="xl" />
    </HStack>
  )
}
