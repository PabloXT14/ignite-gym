import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import type { HistoryDTO } from '../dtos/history-dto'

type HistoryCardProps = {
  data: HistoryDTO
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack className="w-full px-5 py-4 mb-3 bg-gray-600 rounded-lg items-center justify-between">
      <VStack className="mr-5 flex-1">
        <Heading
          className="text-white text-base font-bold capitalize"
          numberOfLines={1}
        >
          {data.group}
        </Heading>

        <Text className="text-gray-100 text-lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text className="text-gray-300 text-base">{data.hour}</Text>
    </HStack>
  )
}
