import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'


const _layout = () => {
  return (
 
   <Tabs
   tabBar={props=><TabBar {...props}/>}
   >
    {/* <Tabs.Screen
    name='index'
    options={{
        headerShown:false
    }}
    /> */}
     <Tabs.Screen
    name='home'
    options={{
        title:"Home",
        headerShown:false
    }}
    />
     {/* <Tabs.Screen
    name='login'
    options={{
        title:"Login"
    }}
    /> */}
     <Tabs.Screen
    name='leaderboard'
    options={{
        title:"Leaderboard"
    
    ,headerShown:false}}
    />
   </Tabs>

  )
}

export default _layout