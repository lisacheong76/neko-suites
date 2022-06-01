import React from 'react'
import { View, Text } from 'react-native'

const BookingPage = ({navigation, route}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Booking Page</Text>
      <Text>{route.params?.title}</Text>
    </View>
  )
}

export default BookingPage;
