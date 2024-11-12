import tw from '@/lib/tailwind'
import { Text } from 'react-native'
import { ClassInput } from 'twrnc'

export type TCustomTextVariant =
  | 'default'
  | 'accent'
  | 'background'
  | 'secondary'
  | 'subtle'

type TCustomTextProps = {
  variant?: TCustomTextVariant
  children: string | string[] | null | undefined
  onPress?: () => void
  customStyle?: ClassInput
}

const variantMapper: Record<TCustomTextVariant, string> = {
  default: 'text-text',
  accent: 'text-accent',
  background: 'text-background',
  secondary: 'text-secondary',
  subtle: 'text-slate-500',
}

const CustomText = ({
  children,
  onPress,
  variant = 'default',
  customStyle,
}: TCustomTextProps) => {
  if (!children) return null

  return (
    <Text
      style={tw.style(variantMapper[variant], customStyle)}
      onPress={onPress}
    >
      {children}
    </Text>
  )
}

export default CustomText
