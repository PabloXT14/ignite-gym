import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Input as GluestackInput, InputField } from '@/components/ui/input'

import { colors } from '../styles/colors'

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
}

export function Input({ isReadOnly = false, className, ...props }: InputProps) {
  return (
    <GluestackInput
      className={twMerge(
        'h-14 border border-transparent rounded-md data-[focus=true]:border-green-500',
        isReadOnly && 'opacity-50'
      )}
      isReadOnly={isReadOnly}
      focusable
    >
      <InputField
        className={twMerge(
          'text-white bg-gray-700 font-regular px-4 rounded-md',
          className
        )}
        placeholderTextColor={colors.gray[300]}
        {...props}
      />
    </GluestackInput>
  )
}
