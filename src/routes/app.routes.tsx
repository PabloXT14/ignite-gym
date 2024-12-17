import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/home'
import { Profile } from '../screens/profile'
import { History } from '../screens/history'
import { Exercise } from '../screens/exercise'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />

      <Screen name="history" component={History} />

      <Screen name="profile" component={Profile} />

      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
