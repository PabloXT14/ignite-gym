import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'

import backgroundImg from '../assets/background.png'

export function SignIn() {
  return (
    <VStack className="flex-1 bg-gray-700">
      <Image
        source={backgroundImg}
        defaultSource={backgroundImg}
        alt="Pessoas treinando"
        className="absolute w-full h-[624px]"
      />
    </VStack>
  )
}
