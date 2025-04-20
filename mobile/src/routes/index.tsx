import {
  NavigationContainer,
  DefaultTheme,
  type LinkingOptions,
} from '@react-navigation/native'

import { Box } from '@/components/ui/box'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { Loading } from '../components/loading'
import { useAuth } from '../hooks/use-auth'

import { colors } from '../styles/colors'

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['ignite-gym://', 'com.pabloxt14.ignitegym://'],
  config: {
    screens: {
      signIn: 'signIn',
      signUp: 'signUp',
      home: 'home',
      profile: 'profile',
      history: 'history',
      exercise: {
        path: '/exercise/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId,
        },
      },
      notFound: {
        path: '*',
      },
    },
  },
}

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()
  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
