import { Stack } from 'expo-router/stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalHost } from '@rn-primitives/portal'

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </GestureHandlerRootView>
  )
}
