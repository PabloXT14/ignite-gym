import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Button } from '../components/button'

import type { AppNavigatorRoutesProps } from '../routes/app.routes'

export function NotFound() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack className="flex-1 items-center justify-center p-8">
      <VStack className="items-center mb-4">
        <Text className="text-green-500 text-6xl font-bold">404</Text>

        <Text className="text-gray-100 text-center text-2xl">
          Página não encontrada
        </Text>
      </VStack>

      <Button
        title="Voltar ao início"
        onPress={() => navigation.navigate('home')}
      />
    </VStack>
  )
}
