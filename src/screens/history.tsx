import { VStack } from '@/components/ui/vstack'

import { ScreenHeader } from '../components/screen-header'
import { HistoryCard } from '../components/history-card'

export function History() {
  return (
    <VStack className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      <HistoryCard />
    </VStack>
  )
}
