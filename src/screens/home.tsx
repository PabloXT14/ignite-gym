import { useState } from 'react'
import { FlatList } from 'react-native'

import { VStack } from '@/components/ui/vstack'

import { HomeHeader } from '../components/home-header'
import { Group } from '../components/group'

export function Home() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro'])
  const [groupSelected, setGroupSelected] = useState('costas')

  return (
    <VStack className="flex-1">
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, gap: 12 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />
    </VStack>
  )
}
