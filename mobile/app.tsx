import { StatusBar } from 'react-native'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import '@/global.css'

import { Loading } from './src/components/loading'
import { Routes } from './src/routes'
import { AuthContextProvider } from './src/contexts/auth-context'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  console.log('ONESIGNAL_APP_ID: ', process.env.ONESIGNAL_APP_ID)

  return (
    <GluestackUIProvider mode="light">
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  )
}
