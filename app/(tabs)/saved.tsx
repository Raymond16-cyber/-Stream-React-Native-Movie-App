import { View, Text } from 'react-native'
import React from 'react'
import { connectAnonymously } from '@/test/checkAppwritConnect'


const saved = () => {
   connectAnonymously()
   
  return (
    <View>
      <Text>saved</Text>
    </View>
  )
}

export default saved