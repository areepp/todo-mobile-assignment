import CustomText from '@/components/custom-text'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import capitalize from '@/lib/capitalize'
import { TouchableOpacity, View } from 'react-native'
import FeatherIcon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTodoFilterStore } from '../hooks/use-todo-filter-store'
import tw from '@/lib/tailwind'

export default function StatusFilterPopover() {
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }

  const { statusFilter, setStatusFilter } = useTodoFilterStore()

  return (
    <Popover>
      <PopoverTrigger>
        <View style={tw`flex flex-row gap-1 items-center`}>
          <FeatherIcon name="filter" />
          <CustomText>{capitalize(statusFilter)}</CustomText>
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
            setStatusFilter('all')
          }}
        >
          <CustomText customStyle={[statusFilter === 'all' ? 'font-bold' : '']}>
            All
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border-b py-2`}
          onPress={() => {
            setStatusFilter('active')
          }}
        >
          <CustomText
            customStyle={[statusFilter === 'active' ? 'font-bold' : '']}
          >
            Active
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`py-2`}
          onPress={() => {
            setStatusFilter('completed')
          }}
        >
          <CustomText
            customStyle={[statusFilter === 'completed' ? 'font-bold' : '']}
          >
            Completed
          </CustomText>
        </TouchableOpacity>
      </PopoverContent>
    </Popover>
  )
}
