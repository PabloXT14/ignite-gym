import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { useToast } from '@/components/ui/toast'

import { ScreenHeader } from '../components/screen-header'
import { HistoryCard } from '../components/history-card'
import { ToastMessage } from '../components/toast-message'

import { getHistory } from '../https/get-history'
import { AppError } from '../utils/app-error'
import { useFocusEffect } from '@react-navigation/native'

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
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const { history } = await getHistory()

      console.log(history[0].data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o histórico de exercícios.'

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

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

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
