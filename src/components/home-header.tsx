import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

export function HomeHeader() {
  return (
    <HStack className="bg-gray-600 pt-16 pb-5 px-8 items-center">
      <VStack>
        <Text className="text-gray-100 text-base font-regular">Olá</Text>

        <Heading className="text-gray-100 text-base font-bold">
          John Doe
        </Heading>
      </VStack>
    </HStack>
  )
}
