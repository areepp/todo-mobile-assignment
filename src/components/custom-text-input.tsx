import { TextInput, TextInputProps, View } from 'react-native'
import tw from '@/lib/tailwind'
import { ClassInput } from 'twrnc'

type CustomTextInputProps = TextInputProps & {
  customStyle?: ClassInput
}

const CustomTextInput = ({
  onChangeText,
  value,
  placeholder,
  customStyle,
  keyboardType,
  onBlur,
  editable,
  showSoftInputOnFocus = true,
}: CustomTextInputProps) => {
  return (
    <View
      style={tw.style(
        'border-b py-1 border-accent text-text flex flex-row items-center w-full',
        customStyle,
      )}
    >
      <TextInput
        style={tw.style('text-text flex-1')}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={tw.color('zinc-700')}
        keyboardType={keyboardType}
        onBlur={onBlur}
        editable={editable}
        showSoftInputOnFocus={showSoftInputOnFocus}
      />
    </View>
  )
}

export default CustomTextInput
