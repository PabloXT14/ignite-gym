import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'

import { Input } from '../components/input'
import { Button } from '../components/button'
import type { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import Logo from '@src/assets/logo.svg'
import backgroundImg from '../assets/background.png'

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1">
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

          <Center className="gap-3 flex-1">
            <Heading className="text-gray-100">Crie sua conta</Heading>

            <Input placeholder="Nome" />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input placeholder="Senha" secureTextEntry />

            <Input placeholder="Confirmar senha" secureTextEntry />

            <Button title="Criar e acessar" />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            className="mt-20"
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
