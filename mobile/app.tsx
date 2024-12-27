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
import { AuthContext } from './src/contexts/auth-context'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GluestackUIProvider mode="light">
      <AuthContext.Provider
        value={{
          user: {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@email.com',
            avatar: 'https://github.com/pabloxt14.png',
          },
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </GluestackUIProvider>
  )
}
