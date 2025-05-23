import { useState } from 'react'
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
import { useToast } from '@/components/ui/toast'

import { Input } from '../components/input'
import { Button } from '../components/button'
import { ToastMessage } from '../components/toast-message'
import type { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import { AppError } from '../utils/app-error'
import { createUser } from '../https/create-user'
import { useAuth } from '../hooks/use-auth'

import Logo from '@src/assets/logo.svg'
import backgroundImg from '@src/assets/background.png'

const FormSchema = z
  .object({
    name: z
      .string({ required_error: 'Informe o nome' })
      .nonempty('Informe o nome'),
    email: z
      .string({ required_error: 'Informe o e-mail' })
      .email('E-mail inválido'),
    password: z
      .string({ required_error: 'Informe a senha' })
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
    confirmPassword: z
      .string({ required_error: 'Confirme a senha' })
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword
    },
    {
      message: 'A confirmação da senha não confere',
      path: ['confirmPassword'],
    }
  )

type FormData = z.infer<typeof FormSchema>

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormData) {
    try {
      setIsLoading(true)

      await createUser({ name, email, password })

      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
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

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
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
