import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn } from '../screens/sign-in'
import { SignUp } from '../screens/sign-up'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="sign-in" component={SignIn} />

      <Screen name="sign-up" component={SignUp} />
    </Navigator>
  )
}
