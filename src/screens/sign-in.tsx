import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'

import Logo from '@src/assets/logo.svg'
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

      <Center className="my-24">
        <Logo />

        <Text className="text-gray-100 text-sm">
          Treine sua mente e seu corpo
        </Text>
      </Center>
    </VStack>
  )
}
