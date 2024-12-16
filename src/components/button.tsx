import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

import {
  ButtonSpinner,
  ButtonText,
  Button as GluestackButton,
} from '@/components/ui/button'

const buttonStyle = tv({
  base: 'w-full h-14 rounded-md transition-all',
  variants: {
    variant: {
      solid: 'bg-green-700 data-[active=true]:bg-green-500',
      outline:
        'bg-transparent border border-green-500 data-[active=true]:bg-green-700',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
})

type ButtonProps = VariantProps<typeof buttonStyle> &
  ComponentProps<typeof GluestackButton> & {
    title: string
    isLoading?: boolean
  }

export function Button({
  title,
  isLoading,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <GluestackButton
      className={buttonStyle({ variant, class: className })}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner className="text-white" />
      ) : (
        <ButtonText
          className={twMerge(
            'text-white font-regular',
            variant === 'outline' && 'text-green-500'
          )}
        >
          {title}
        </ButtonText>
      )}
    </GluestackButton>
  )
}
