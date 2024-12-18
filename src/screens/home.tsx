import { useState } from 'react'
import { FlatList } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

import { HomeHeader } from '../components/home-header'
import { Group } from '../components/group'
import { ExerciseCard } from '../components/exercise-card'

export function Home() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro'])
  const [groupSelected, setGroupSelected] = useState('costas')

  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
    'Puxada lateral',
    'Remada na barra',
  ])

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
          keyExtractor={item => item}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-5 gap-3"
        />
      </VStack>
    </VStack>
  )
}
