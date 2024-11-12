import CustomText from '@/components/custom-text'
import tw from '@/lib/tailwind'
import { Pressable, View } from 'react-native'
import { TTimeFilter, useTodoFilterStore } from '../hooks/use-todo-filter-store'
import capitalize from '@/lib/capitalize'

function ToggleItem({ timeFilter }: Readonly<{ timeFilter: TTimeFilter }>) {
  const { activeTimeFilter, setActiveTimeFilter } = useTodoFilterStore()

  return (
    <Pressable
      onPress={() => setActiveTimeFilter(timeFilter)}
      style={tw.style(
        'flex-1 flex items-center px-6 py-3',
        timeFilter === activeTimeFilter ? 'rounded-full bg-primary' : '',
      )}
    >
      <CustomText
        variant={timeFilter === activeTimeFilter ? 'background' : 'default'}
      >
        {capitalize(timeFilter)}
      </CustomText>
    </Pressable>
  )
}

export default function ToggleDailyMonthly() {
  return (
    <View
      style={tw`w-full flex flex-row over border rounded-full border-accent`}
    >
      <ToggleItem timeFilter="monthly" />
      <ToggleItem timeFilter="daily" />
    </View>
  )
}
