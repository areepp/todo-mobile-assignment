import { Stack } from 'expo-router/stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalHost } from '@rn-primitives/portal'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function Layout() {
  useEffect(() => {
    // Request permissions on app load
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission for notifications was denied!')
      }
    }

    requestPermissions()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </GestureHandlerRootView>
  )
}
