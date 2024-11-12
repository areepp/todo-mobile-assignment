import tw from '@/lib/tailwind'
import * as PopoverPrimitive from '@rn-primitives/popover'
import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  PopoverPrimitive.ContentRef,
  PopoverPrimitive.ContentProps & { portalHost?: string }
>(({ style, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            style={tw.style(
              'z-50 w-72 rounded-md web:cursor-auto border bg-secondary p-4 shadow-md web:outline-none web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2 web:animate-in web:zoom-in-95 web:fade-in-0',
              style,
            )}
            {...props}
          />
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }