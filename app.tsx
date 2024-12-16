import { StatusBar } from 'react-native'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import '@/global.css'

import { Loading } from './src/components/loading'
import { SignIn } from './src/screens/sign-in'
import { SignUp } from './src/screens/sign-up'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GluestackUIProvider mode="light">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignUp /> : <Loading />}
    </GluestackUIProvider>
  )
}
