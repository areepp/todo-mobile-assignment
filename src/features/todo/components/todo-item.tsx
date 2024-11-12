import FeatherIcon from '@expo/vector-icons/Feather'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { format } from 'date-fns'
import { ToastAndroid, TouchableOpacity, View } from 'react-native'

import CustomText from '@/components/custom-text'

import { ITodo, useTodoStore } from '../hooks/use-todo-store'
import { useRef } from 'react'
import tw from '@/lib/tailwind'

function RightActions({ item }: Readonly<{ item: ITodo }>) {
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

export default function TodoItem({ item }: Readonly<{ item: ITodo }>) {
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
