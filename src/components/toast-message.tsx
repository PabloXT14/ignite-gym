import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react-native'

import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { Pressable } from '@/components/ui/pressable'
import { Icon } from '@/components/ui/icon'

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
      <VStack className="w-full">
        <Pressable className="self-end" onPress={onClose}>
          <Icon as={X} className="text-gray-50" size="md" />
        </Pressable>

        <ToastTitle className="text-white font-bold">{title}</ToastTitle>

        {description && (
          <ToastDescription className="text-white font-regular">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
