import { useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import * as NavigationBar  from 'expo-navigation-bar'

import { Box } from '@/components/ui/box'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { Loading } from '../components/loading'
import { useAuth } from '../hooks/use-auth'

import { colors } from '../styles/colors'
import { Platform } from 'react-native'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.gray[600])
    }
  }, [])

  return (
    <Box className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
