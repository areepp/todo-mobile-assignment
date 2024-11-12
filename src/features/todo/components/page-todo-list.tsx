import FeatherIcon from '@expo/vector-icons/Feather'
import CustomText from '@/components/custom-text'
import { ITodo, useTodoStore } from '@/features/todo/hooks/use-todo-store'
import tw from '@/lib/tailwind'
import { FlatList, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMemo, useRef, useState } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import capitalize from '@/lib/capitalize'

const RightActions = ({ item }: { item: ITodo }) => {
  const { deleteTodo } = useTodoStore()

  const handleDeleteBudget = () => {
    deleteTodo(item.id)
  }

  return (
    <View style={tw`flex flex-row gap-6 px-3 items-center justify-center`}>
      <TouchableOpacity
        style={tw`flex items-center justify-center flex-row gap-2`}
        onPress={handleDeleteBudget}
      >
        <View style={tw`mx-auto`}>
          <FeatherIcon name="trash-2" color={tw.color('accent')} size={20} />
        </View>
        <CustomText variant="accent">Delete</CustomText>
      </TouchableOpacity>
    </View>
  )
}

const TodoItem = ({ item }: { item: ITodo }) => {
  const swipeableRef = useRef<Swipeable | null>(null)

  const { toggleCompleted } = useTodoStore()

  const handleToggleComplete = () => {
    if (!item.completed)
      ToastAndroid.show('Task completed!', ToastAndroid.CENTER)

    toggleCompleted(item.id)
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => <RightActions item={item} />}
    >
      <View
        style={tw`flex flex-row justify-between items-center bg-secondary p-3 rounded shadow`}
      >
        <View style={tw`flex flex-row items-center gap-3`}>
          <TouchableOpacity
            onPress={handleToggleComplete}
            style={tw.style(
              'rounded-full flex items-center justify-center w-5 h-5',
              item.completed ? 'bg-green-400' : 'border',
            )}
          >
            <FeatherIcon
              name="check"
              color={item.completed ? tw.color('background') : tw.color('text')}
            />
          </TouchableOpacity>
          <CustomText
            customStyle={[
              'font-bold text-lg',
              item.completed ? 'line-through' : '',
            ]}
          >
            {item.task}
          </CustomText>
        </View>
        <CustomText customStyle="font-medium mr-3">
          {item.time && format(new Date(item.time), 'h:mm a')}
        </CustomText>
      </View>
    </Swipeable>
  )
}

type TTodoFilter = 'all' | 'completed' | 'active'

export default function PageTodoList() {
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }

  const [filter, setFilter] = useState<TTodoFilter>('all')

  const { todos } = useTodoStore()

  const filteredTodosByStatus = useMemo(() => {
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    return todos
  }, [todos, filter])

  return (
    <SafeAreaView style={tw`px-12`}>
      <View style={tw`h-20 w-20`}></View>
      <Popover>
        <PopoverTrigger>
          <View style={tw`flex flex-row gap-1 items-center`}>
            <FeatherIcon name="filter" />
            <CustomText>{capitalize(filter)}</CustomText>
          </View>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          style={{ width: 120 }}
          insets={contentInsets}
        >
          <TouchableOpacity
            style={tw`border-b pb-2`}
            onPress={() => {
              setFilter('all')
            }}
          >
            <CustomText customStyle={[filter === 'all' ? 'font-bold' : '']}>
              All
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`border-b py-2`}
            onPress={() => {
              setFilter('active')
            }}
          >
            <CustomText customStyle={[filter === 'active' ? 'font-bold' : '']}>
              Active
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`py-2`}
            onPress={() => {
              setFilter('completed')
            }}
          >
            <CustomText
              customStyle={[filter === 'completed' ? 'font-bold' : '']}
            >
              Completed
            </CustomText>
          </TouchableOpacity>
        </PopoverContent>
      </Popover>
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
