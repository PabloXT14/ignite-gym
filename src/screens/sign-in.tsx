import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'

import { Input } from '../components/input'
import { Button } from '../components/button'

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

      <VStack className="flex-1 px-10 pb-16">
        <Center className="my-24">
          <Logo />

          <Text className="text-gray-100 text-sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center className="gap-2">
          <Heading className="text-gray-100">Acesse sua conta</Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
        </Center>

        <Center className="flex-1 justify-end mt-4">
          <Text className="text-gray-100 text-base mb-3 font-regular">
            Ainda não tem acesso?
          </Text>

          <Button title="Criar Conta" variant="outline" />
        </Center>
      </VStack>
    </VStack>
  )
}
