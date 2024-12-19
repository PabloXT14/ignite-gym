import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'

import type { AppNavigatorRoutesProps } from '../routes/app.routes'

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
      </VStack>
    </VStack>
  )
}
