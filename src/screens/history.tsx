import { useState } from 'react'
import { SectionList } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'

import { ScreenHeader } from '../components/screen-header'
import { HistoryCard } from '../components/history-card'
import { Text } from '@/components/ui/text'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '22.07.24',
      data: ['Puxada frontal', 'Remada curvada', 'Remada unilateral'],
    },
    {
      title: '23.07.24',
      data: ['Puxada frontal'],
    },
  ])

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading className="text-gray-200 text-base font-bold mt-10 mb-3">
            {section.title}
          </Heading>
        )}
        className="px-8"
        contentContainerStyle={
          exercises.length === 0 && {
            flex: 1,
            justifyContent: 'center',
          }
        }
        ListEmptyComponent={() => (
          <Text className="text-gray-200 text-center">
            Não há exercícios registrados ainda. {'\n'} Vamos fazer exercícios
            hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}
