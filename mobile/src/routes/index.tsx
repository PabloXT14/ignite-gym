import { useEffect } from 'react'
import { Platform } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'

import { Box } from '@/components/ui/box'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { Loading } from '../components/loading'
import { useAuth } from '../hooks/use-auth'

import { colors } from '../styles/colors'

import { countExercisesThisWeek } from '../https/count-exercises-this-week'
import { updateTotalExercisesOnWeekTag } from '../notifications/notification-tags'
import { useExercise } from '../hooks/use-exercise'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()
  const setWeeklyExercises = useExercise(state => state.setWeeklyExercises)

  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  async function getExercisesThisWeek() {
    const { count } = await countExercisesThisWeek()

    setWeeklyExercises(count)
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.gray[600])
    }
  }, [])

  useEffect(() => {
    if (user.id) {
      getExercisesThisWeek()
    }
  }, [user.id])

  return (
    <Box className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
