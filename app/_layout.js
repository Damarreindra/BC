import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'

const _layout = () => {
  return (
   <Tabs
   tabBar={props=><TabBar {...props}/>}
   >
    <Tabs.Screen
    name='index'
    options={{
        headerShown:false
    }}
    />
     <Tabs.Screen
    name='home'
    options={{
        title:"Home",
        
    }}
    />
     <Tabs.Screen
    name='login'
    options={{
        title:"Login"
    }}
    />
   </Tabs>
  )
}

export default _layout