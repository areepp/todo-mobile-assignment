import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import CustomText, { TCustomTextVariant } from './custom-text'
import tw from '@/lib/tailwind'

type TButtonVariant = 'background' | 'accent' | 'primary'

type ButtonProps = {
  text: string
  customStyle?: string
  variant?: TButtonVariant
} & Pick<TouchableOpacityProps, 'onPress' | 'disabled'>

const CustomTextVariantMapper: Record<TButtonVariant, TCustomTextVariant> = {
  accent: 'background',
  primary: 'background',
  background: 'accent',
}

const Button = ({
  text,
  onPress,
  customStyle,
  disabled,
  variant = 'background',
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={tw.style(
        'self-center border rounded-lg p-3 border-accent',
        variant === 'background' && 'bg-background ',
        variant === 'accent' && 'bg-accent',
        variant === 'primary' && 'bg-primary',
        disabled && 'bg-opacity-60',
        customStyle,
      )}
      disabled={disabled}
      onPress={onPress}
    >
      <CustomText
        variant={CustomTextVariantMapper[variant]}
        customStyle="text-center font-medium"
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  )
}

export default Button
