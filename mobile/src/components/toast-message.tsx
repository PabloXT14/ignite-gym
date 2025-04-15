import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react-native'

import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { Pressable } from '@/components/ui/pressable'
import { Icon } from '@/components/ui/icon'
import { HStack } from '@/components/ui/hstack'

type ToastMessageProps = {
  id: string
  title: string
  description?: string
  action?: 'error' | 'success'
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action = 'success',
  onClose,
}: ToastMessageProps) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      className={twMerge(
        'mt-10 mx-5',
        action === 'success' ? 'bg-green-500' : 'bg-red-500'
      )}
    >
      <VStack className="w-full gap-2">
        <HStack className="w-full items-center justify-between">
          <ToastTitle
            className="text-white text-base font-bold flex-1"
            numberOfLines={1}
          >
            {title}
          </ToastTitle>

          <Pressable onPress={onClose}>
            <Icon as={X} className="text-gray-50" size="md" />
          </Pressable>
        </HStack>

        {description && (
          <ToastDescription className="text-white text-xs font-regular">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
