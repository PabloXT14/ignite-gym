import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  ButtonSpinner,
  ButtonText,
  Button as GluestackButton,
} from '@/components/ui/button'

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading, className, ...props }: ButtonProps) {
  return (
    <GluestackButton
      className={twMerge(
        'w-full h-14 bg-green-700 rounded-md transition-all data-[active=true]:bg-green-500',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner className="text-white" />
      ) : (
        <ButtonText className="text-white font-bold text-sm">
          {title}
        </ButtonText>
      )}
    </GluestackButton>
  )
}
