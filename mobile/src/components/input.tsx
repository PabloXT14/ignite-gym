import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Input as GluestackInput, InputField } from '@/components/ui/input'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control'

import { colors } from '../styles/colors'

type InputProps = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Input({
  isReadOnly = false,
  isInvalid = false,
  errorMessage = null,
  className,
  ...props
}: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} className="mb-4 w-full">
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

      <FormControlError>
        <FormControlErrorText className="text-red-500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
