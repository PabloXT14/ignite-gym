import { useState } from 'react'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'

import { HomeHeader } from '../components/home-header'
import { Group } from '../components/group'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas')

  return (
    <VStack className="flex-1">
      <HomeHeader />

      <HStack className="gap-3 mt-10 ml-8">
        <Group
          name="Costas"
          isActive={groupSelected === 'costas'}
          onPress={() => setGroupSelected('costas')}
        />

        <Group
          name="Ombro"
          isActive={groupSelected === 'ombro'}
          onPress={() => setGroupSelected('ombro')}
        />
      </HStack>
    </VStack>
  )
}
