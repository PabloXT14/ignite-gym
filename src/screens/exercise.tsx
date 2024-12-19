import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'
import { HStack } from '@/components/ui/hstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

import type { AppNavigatorRoutesProps } from '../routes/app.routes'

import BodySvg from '@src/assets/body.svg'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack className="flex-1">
      <VStack className="px-8 bg-gray-600 pt-12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} className="text-green-500" size="xl" />
        </TouchableOpacity>

        <HStack className="justify-between items-center mt-4 mb-8">
          <Heading className="text-gray-100 text-lg font-bold shrink">
            Puxada frontal
          </Heading>

          <HStack className="items-center gap-1">
            <BodySvg />

            <Text className="text-gray-200 capitalize">Costas</Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  )
}
