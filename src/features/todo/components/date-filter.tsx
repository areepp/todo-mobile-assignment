import FeatherIcon from '@expo/vector-icons/Feather'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { TouchableOpacity, View } from 'react-native'
import { useTodoFilterStore } from '../hooks/use-todo-filter-store'
import CustomText from '@/components/custom-text'
import { format } from 'date-fns'
import { useState } from 'react'
import tw from '@/lib/tailwind'
import { Calendar } from 'react-native-calendars'

export default function DateFilter() {
  const { activeTimeFilter, activeDate, setActiveDate } = useTodoFilterStore()
  const [showDatePicker, setShowDatePicker] = useState(false)

  function handleConfirmDate(date: Date) {
    setActiveDate(date.toISOString())
    setShowDatePicker(false)
  }

  function onMonthChange({ dateString, ...rest }: { dateString: number }) {
    setActiveDate(new Date(dateString).toISOString())
  }

  if (activeTimeFilter === 'monthly') {
    return <Calendar current={activeDate} onMonthChange={onMonthChange} />
  } else {
    return (
      <>
        <View style={tw`flex justify-between flex-row items-center`}>
          <CustomText customStyle="text-2xl font-bold">
            {format(activeDate, 'MMM d, yyy')}
          </CustomText>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <FeatherIcon name="calendar" size={20} />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          date={new Date(activeDate)}
          isVisible={showDatePicker}
          onCancel={() => setShowDatePicker(false)}
          onConfirm={handleConfirmDate}
        />
      </>
    )
  }
}
