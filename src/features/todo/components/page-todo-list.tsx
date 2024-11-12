import { useTodoStore } from '@/features/todo/hooks/use-todo-store'
import tw from '@/lib/tailwind'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMemo } from 'react'
import ToggleDailyMonthly from './toggle-daily-monthly'
import { useTodoFilterStore } from '../hooks/use-todo-filter-store'
import StatusFilterPopover from './status-filter-popover'
import TodoItem from './todo-item'

export default function PageTodoList() {
  const { statusFilter } = useTodoFilterStore()

  const { todos } = useTodoStore()

  const filteredTodosByStatus = useMemo(() => {
    if (statusFilter === 'completed')
      return todos.filter((todo) => todo.completed)
    if (statusFilter === 'active')
      return todos.filter((todo) => !todo.completed)
    return todos
  }, [todos, statusFilter])

  return (
    <SafeAreaView style={tw`p-12`}>
      <ToggleDailyMonthly />
      <StatusFilterPopover />
      <FlatList
        style={tw`mt-3`}
        data={filteredTodosByStatus}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TodoItem item={item} />}
        contentContainerStyle={{
          gap: 12,
        }}
      />
    </SafeAreaView>
  )
}
