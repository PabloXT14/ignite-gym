import { VStack } from '@/components/ui/vstack'

import { HomeHeader } from '../components/home-header'
import { Group } from '../components/group'

export function Home() {
  return (
    <VStack className="flex-1">
      <HomeHeader />

      <Group name="Costas" isActive={false} />
    </VStack>
  )
}
