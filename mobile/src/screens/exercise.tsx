import { TouchableOpacity, ScrollView } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'
import { HStack } from '@/components/ui/hstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Image } from '@/components/ui/image'
import { Box } from '@/components/ui/box'

import type { AppNavigatorRoutesProps } from '../routes/app.routes'
import { Button } from '../components/button'

import BodySvg from '@src/assets/body.svg'
import SeriesSvg from '@src/assets/series.svg'
import RepetitionsSvg from '@src/assets/repetitions.svg'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()

  const { exerciseId } = route.params as RouteParamsProps

  console.log('EXERCISE ID: ', exerciseId)

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        <VStack className="p-8">
          <Image
            source={{
              uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp',
            }}
            alt="Exercício"
            className="mb-4 w-full h-[364px] rounded-lg"
            resizeMode="cover"
          />

          <Box className="bg-gray-600 rounded-lg pb-4 px-4">
            <HStack className="items-center justify-around mb-6 mt-5">
              <HStack>
                <SeriesSvg />
                <Text className="text-gray-200 ml-2">3 séries</Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2">12 repetições</Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
