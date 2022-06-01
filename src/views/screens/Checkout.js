import React from 'react'
import { View, Text } from 'react-native'

const Checkout = ({navigation, route}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Checkout Screen</Text>
      <Text>{route.params?.title}</Text>
    </View>
  )
}

export default Checkout;
