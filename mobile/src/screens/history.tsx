import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { useToast } from '@/components/ui/toast'

import { ScreenHeader } from '../components/screen-header'
import { HistoryCard } from '../components/history-card'
import { ToastMessage } from '../components/toast-message'
import { Loading } from '../components/loading'

import { getHistory } from '../https/get-history'
import { AppError } from '../utils/app-error'
import { useFocusEffect } from '@react-navigation/native'

import type { HistoryByDayDTO } from '../dtos/history-by-day-dto'

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const { history } = await getHistory()

      setExercises(history)
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

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <HistoryCard data={item} />}
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
      )}
    </VStack>
  )
}
