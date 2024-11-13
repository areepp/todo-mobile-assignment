import { useTodoStore } from '@/features/todo/hooks/use-todo-store'
import tw from '@/lib/tailwind'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMemo } from 'react'
import ToggleDailyMonthly from './toggle-daily-monthly'
import { useTodoFilterStore } from '../hooks/use-todo-filter-store'
import StatusFilterPopover from './status-filter-popover'
import TodoItem from './todo-item'
import DateFilter from './date-filter'
import CustomText from '@/components/custom-text'

export default function PageTodoList() {
  const { statusFilter, activeTimeFilter, activeDate } = useTodoFilterStore()

  const { todos } = useTodoStore()

  const filteredTodosByStatus = useMemo(() => {
    let parsedTodos = todos

    if (activeTimeFilter === 'daily') {
      parsedTodos = todos.filter((todo) => {
        return new Date(todo.date).toDateString() == activeDate.toDateString()
      })
    }

    if (statusFilter === 'completed')
      return parsedTodos.filter((todo) => todo.completed)
    if (statusFilter === 'active')
      return parsedTodos.filter((todo) => !todo.completed)
    return parsedTodos
  }, [todos, statusFilter, activeDate])

  return (
    <SafeAreaView style={{ display: 'flex' }}>
      <View style={tw`px-12 pt-12 bg-secondary`}>
        <ToggleDailyMonthly />
        <View style={tw`my-6`}>
          <DateFilter />
        </View>
      </View>

      <View style={tw`px-12`}>
        {activeTimeFilter === 'monthly' && (
          <CustomText customStyle="text-2xl font-bold mt-3">
            This month
          </CustomText>
        )}
        <View style={tw`mt-3`}>
          <StatusFilterPopover />
        </View>
        <View>
          <FlatList
            style={tw`mt-3`}
            data={filteredTodosByStatus}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TodoItem item={item} />}
            contentContainerStyle={{
              gap: 12,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
