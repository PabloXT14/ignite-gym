import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

const FormSchema = z.object({
  email: z
    .string({ required_error: 'Informe o e-mail' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Informe a senha' })
    .min(6, 'A senha deve ter no mínimo 6 dígitos'),
})

type FormData = z.infer<typeof FormSchema>

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn(data: FormData) {
    console.log(data)
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
            <Heading className="text-gray-100">Acesse sua conta</Heading>

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
          </Center>

          <Center className="flex-1 justify-end mt-28">
            <Text className="text-gray-100 text-base mb-3 font-regular">
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar Conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
