import CustomText from '@/components/custom-text'
import CustomTextInput from '@/components/custom-text-input'
import tw from '@/lib/tailwind'
import FeatherIcon from '@expo/vector-icons/Feather'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useState } from 'react'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { format } from 'date-fns'
import Button from '@/components/button'
import { useTodoStore } from '../hooks/use-todo-store'

export default function AddTodoPage() {
  const [todo, setTodo] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const { addTodo } = useTodoStore()

  function handleConfirmDate(date: Date) {
    setDate(date)
    setShowDatePicker(false)
  }

  function handleConfirmTime(date: Date) {
    setTime(date)
    setShowTimePicker(false)
  }

  function handleAddTodo() {
    Keyboard.dismiss()
    addTodo({ task: todo, date, time })

    // reset form
    setTodo('')
    setDate(new Date())
    setTime(null)
  }

  return (
    <SafeAreaView style={tw`p-6 flex-1 flex flex-col gap-3`}>
      <CustomTextInput
        placeholder="Enter new todo name"
        value={todo}
        onChangeText={setTodo}
      />
      <TouchableOpacity
        style={tw`mt-5`}
        onPress={() => setShowDatePicker(true)}
      >
        <View style={tw`flex flex-row items-center gap-3`}>
          <FeatherIcon name="calendar" />
          <CustomText>{format(date, 'EEEE, MMM d yyyy')}</CustomText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <View style={tw`flex flex-row items-center gap-3`}>
          <FeatherIcon name="clock" />
          <CustomText>{time ? format(time, 'h:mm a') : 'Add time'}</CustomText>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        onCancel={() => setShowDatePicker(false)}
        onConfirm={handleConfirmDate}
        minimumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={showTimePicker}
        onCancel={() => setShowTimePicker(false)}
        onConfirm={handleConfirmTime}
        minimumDate={new Date()}
        mode="time"
      />
      <Button
        onPress={handleAddTodo}
        disabled={todo === ''}
        text="ADD"
        customStyle="w-full"
        variant="primary"
      />
    </SafeAreaView>
  )
}
