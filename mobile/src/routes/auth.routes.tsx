import { useEffect } from 'react'
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import * as NavigationBar from 'expo-navigation-bar'

import { SignIn } from '../screens/sign-in'
import { SignUp } from '../screens/sign-up'
import { colors } from '../styles/colors'

type AuthRoutesProps = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>()

export function AuthRoutes() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.gray[700])
  }, [])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />

      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
