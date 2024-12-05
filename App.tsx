import { StyleSheet, View, StatusBar } from 'react-native'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import '@/global.css'

import { Text } from './components/ui/text'
import { Button, ButtonSpinner, ButtonText } from './components/ui/button'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? (
          <View className="flex items-center gap-2">
            <Text className="text-white" size="lg">
              Home
            </Text>

            <Button size="lg" variant="solid" action="primary" className="">
              <ButtonText className="">Button</ButtonText>
              <ButtonSpinner className="text-green-500" />
            </Button>
          </View>
        ) : (
          <View />
        )}
      </View>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202024',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
