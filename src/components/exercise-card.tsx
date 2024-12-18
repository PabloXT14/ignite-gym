import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { ChevronRight } from 'lucide-react-native'

import { HStack } from '@/components/ui/hstack'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Icon } from '@/components/ui/icon'

type ExerciseCardProps = TouchableOpacityProps

export function ExerciseCard({ className, ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity className={twMerge('', className)} {...props}>
      <HStack className="bg-gray-500 items-center p-2.5 pr-4 rounded-lg ">
        <Image
          source={{
            uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp',
          }}
          alt="Imagem do exercício"
          className="size-16 rounded-md mr-4"
          resizeMode="cover"
        />

        <VStack className="flex-1">
          <Heading className="text-white text-lg font-bold">
            Puxada frontal
          </Heading>

          <Text className="text-gray-200 text-sm mt-1" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} className="text-gray-300" size="xl" />
      </HStack>
    </TouchableOpacity>
  )
}
