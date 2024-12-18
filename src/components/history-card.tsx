import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

export function HistoryCard() {
  return (
    <HStack className="w-full px-5 py-4 bg-gray-600 rounded-lg items-center justify-between">
      <VStack className="mr-5">
        <Heading className="text-white text-base font-bold capitalize">
          Costas
        </Heading>

        <Text className="text-gray-100 text-lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text className="text-gray-300 text-base">08:56</Text>
    </HStack>
  )
}
