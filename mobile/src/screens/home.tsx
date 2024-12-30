import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { useToast } from '@/components/ui/toast'

import { HomeHeader } from '../components/home-header'
import { Group } from '../components/group'
import { ExerciseCard } from '../components/exercise-card'
import { ToastMessage } from '../components/toast-message'

import type { AppNavigatorRoutesProps } from '../routes/app.routes'
import type { ExerciseDTO } from '../dtos/exercise-dto'

import { getGroups } from '../https/get-groups'
import { AppError } from '../utils/app-error'
import { getExercisesByGroup } from '../https/get-exercises-by-group'

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState('costas')

  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchGroups() {
    try {
      const groups = await getGroups()
      setGroups(groups)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.'

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
    }
  }

  async function fetchExercisesByGroup() {
    try {
      const exercises = await getExercisesByGroup(groupSelected)

      setExercises(exercises)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.'

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
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack className="flex-1">
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-8 gap-3"
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack className="px-8 flex-1">
        <HStack className="justify-between items-center mb-5">
          <Heading className="text-gray-200 text-base font-bold">
            Exercícios
          </Heading>

          <Text className="text-gray-200 text-sm font-regular">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-5 gap-3"
        />
      </VStack>
    </VStack>
  )
}
