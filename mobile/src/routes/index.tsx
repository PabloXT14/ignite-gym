import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { Box } from '@/components/ui/box'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useAuth } from '../hooks/use-auth'

import { colors } from '../styles/colors'

export function Routes() {
  const { user } = useAuth()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  return (
    <Box className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
