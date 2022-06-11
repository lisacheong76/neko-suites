import React from "react";
import { View, Text } from "react-native";

const BookingHistoryDetails = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Booking History Details Screen</Text>
      <Text>{route.params?.title}</Text>
    </View>
  );
};

export default BookingHistoryDetails;
