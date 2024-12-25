import { Center } from '@/components/ui/center'
import { Heading } from '@/components/ui/heading'

type ScreenHeaderProps = {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center className="bg-gray-600 pb-6 pt-16">
      <Heading className="text-gray-100 text-xl font-bold">{title}</Heading>
    </Center>
  )
}
