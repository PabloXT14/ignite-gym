import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

type GroupProps = ComponentProps<typeof Button> & {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, className, ...props }: GroupProps) {
  return (
    <Button
      className={twMerge(
        'min-w-24 h-12 bg-gray-600 rounded-md justify-center items-center border border-transparent data-[active=true]:border-green-500',
        isActive && 'border-green-500',
        className
      )}
      {...props}
    >
      <Text
        className={twMerge(
          'text-xs font-bold uppercase text-gray-200',
          isActive && 'text-green-500'
        )}
      >
        {name}
      </Text>
    </Button>
  )
}
