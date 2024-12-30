import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { ChevronRight } from 'lucide-react-native'

import { HStack } from '@/components/ui/hstack'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Icon } from '@/components/ui/icon'

import type { ExerciseDTO } from '../dtos/exercise-dto'

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ className, data, ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity className={twMerge('', className)} {...props}>
      <HStack className="bg-gray-500 items-center p-2.5 pr-4 rounded-lg ">
        <Image
          source={{
            uri: 'https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
          }}
          alt="Imagem do exercício"
          className="size-16 rounded-md mr-4"
          resizeMode="cover"
        />

        <VStack className="flex-1">
          <Heading className="text-white text-lg font-bold">
            {data.name}
          </Heading>

          <Text className="text-gray-200 text-sm mt-1" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} className="text-gray-300" size="xl" />
      </HStack>
    </TouchableOpacity>
  )
}
