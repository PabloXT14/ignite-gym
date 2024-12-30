import { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'
import { HStack } from '@/components/ui/hstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { useToast } from '@/components/ui/toast'

import { Button } from '../components/button'
import { ToastMessage } from '../components/toast-message'
import { Loading } from '../components/loading'

import type { AppNavigatorRoutesProps } from '../routes/app.routes'
import type { ExerciseDTO } from '../dtos/exercise-dto'

import { AppError } from '../utils/app-error'
import { getExerciseById } from '../https/get-exercise-by-id'
import { api } from '../services/api'

import BodySvg from '@src/assets/body.svg'
import SeriesSvg from '@src/assets/series.svg'
import RepetitionsSvg from '@src/assets/repetitions.svg'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps

  const toast = useToast()

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const exercise = await getExerciseById(exerciseId)

      setExercise(exercise)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack className="flex-1">
      <VStack className="px-8 bg-gray-600 pt-12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} className="text-green-500" size="xl" />
        </TouchableOpacity>

        <HStack className="justify-between items-center mt-4 mb-8">
          <Heading className="text-gray-100 text-lg font-bold shrink">
            {exercise.name}
          </Heading>

          <HStack className="items-center gap-1">
            <BodySvg />

            <Text className="text-gray-200 capitalize">{exercise.group}</Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack className="p-8">
          <Box className="rounded-lg mb-4 overflow-hidden">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt={exercise.name}
              className="w-full h-[364px] rounded-lg"
              resizeMode="cover"
            />
          </Box>

          <Box className="bg-gray-600 rounded-lg pb-4 px-4">
            <HStack className="items-center justify-around mb-6 mt-5">
              <HStack>
                <SeriesSvg />
                <Text className="text-gray-200 ml-2">
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
