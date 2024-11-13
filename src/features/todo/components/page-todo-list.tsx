import { useTodoStore } from '@/features/todo/hooks/use-todo-store'
import tw from '@/lib/tailwind'
import { FlatList, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
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

  const filteredTodos = useMemo(() => {
    let parsedTodos = todos

    if (activeTimeFilter === 'daily' && activeDate) {
      parsedTodos = parsedTodos.filter((todo) => {
        return (
          new Date(todo.date).toDateString() ==
          new Date(activeDate).toDateString()
        )
      })
    }

    if (activeTimeFilter === 'monthly' && activeDate) {
      parsedTodos = parsedTodos.filter((todo) => {
        return new Date(todo.date).getMonth() == new Date(activeDate).getMonth()
      })
    }

    if (statusFilter === 'completed')
      parsedTodos = parsedTodos.filter((todo) => todo.completed)
    if (statusFilter === 'active')
      parsedTodos = parsedTodos.filter((todo) => !todo.completed)
    return parsedTodos
  }, [todos, statusFilter, activeDate])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
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
          <FlatList
            style={tw`mt-3`}
            data={filteredTodos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TodoItem item={item} />}
            contentContainerStyle={{
              gap: 12,
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
