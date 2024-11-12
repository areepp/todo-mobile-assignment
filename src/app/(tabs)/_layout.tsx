import FeatherIcon from '@expo/vector-icons/Feather'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import tw from '@/lib/tailwind'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'relative',
          elevation: 0,
          backgroundColor: tw.color('background'),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FeatherIcon size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <FeatherIcon size={28} name="clock" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <View
              style={tw`p-3 rounded-full bg-primary mb-6 absolute bottom-0 shadow-lg`}
            >
              <FeatherIcon size={28} name="plus" color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FeatherIcon size={28} name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <FeatherIcon size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
