import { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { Box } from '@/components/ui/box'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { AuthContext } from '../contexts/auth-context'

import { colors } from '../styles/colors'

export function Routes() {
  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  const contextData = useContext(AuthContext)

  console.log('USUÁRIO LOGADO => ', contextData)

  return (
    <Box className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
