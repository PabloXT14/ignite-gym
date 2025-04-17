import { useEffect } from 'react'
import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  type BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import * as NavigationBar from 'expo-navigation-bar'

import { Home } from '../screens/home'
import { Profile } from '../screens/profile'
import { History } from '../screens/history'
import { Exercise } from '../screens/exercise'

import HomeSvg from '@src/assets/home.svg'
import HistorySvg from '@src/assets/history.svg'
import ProfileSvg from '@src/assets/profile.svg'
import { colors } from '../styles/colors'

type AppRoutesProps = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: {
    exerciseId: string
  }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export function AppRoutes() {
  const iconSize = 24

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.gray[600])
  }, [])

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: 10,
          paddingBottom: 50,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Navigator>
  )
}
