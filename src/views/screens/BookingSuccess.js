import React from "react";
import { View, Text, Image } from "react-native";
import COLORS from "../../consts/colors";

const BookingSuccess = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
        backgroundColor: COLORS.background,
      }}
    >
      <Image
        source={require("../../assets/success.png")}
        resizeMode="contain"
        style={{
            width: "45%",
            height: "45%"
        }}
      />
      <Text
        style={{
          fontWeight: "bold",
          letterSpacing: 0.5,
          color: "#665444",
          fontSize: 26,
          textAlign: "center",
          fontFamily: 'sans-serif-medium'
        }}
      >
        Meow Meow Yay!
      </Text>
      <Text
        style={{
          color: "#665444",
          fontSize: 15,
          textAlign: "center",
          fontFamily: 'sans-serif-medium',
          marginTop: 20,
        }}
      >
        Your booking has been confirm. 
    </Text>
    <Text
        style={{
          color: "#665444",
          fontSize: 15,
          textAlign: "center",
          fontFamily: 'sans-serif-medium',
          marginTop: 10,
        }}
      >
        Booking ID
    </Text>
    <Text
        style={{
          color: COLORS.primary,
          fontSize: 15,
          textAlign: "center",
          fontFamily: 'sans-serif-medium',
          marginTop: 50,
        }}
        onPress={() => {
            navigation.replace("Homepage");
          }}
      >
        Click Here!
    </Text>
    </View>
  );
};

export default BookingSuccess;
