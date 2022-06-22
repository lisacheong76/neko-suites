import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import COLORS from "../../consts/colors";
import { firestore } from "../../../firebase";

const BookingSuccess = ({ navigation, route }) => {
  const [bookingData, setBookingData] = useState("");
  const [userData, setUserData] = useState("");

  const getBooking = async () => {
    const bookingRef = firestore
      .collection("booking")
      .doc(route.params.paramkey);
    const doc = await bookingRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setBookingData(doc.data());
    }

    const userRef = firestore.collection("users").doc(doc.data().by);
    const docUser = await userRef.get();
    if (!docUser.exists) {
      console.log("No such document!");
    } else {
      setUserData(docUser.data());
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

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
          height: "45%",
        }}
      />
      <Text
        style={{
          fontWeight: "bold",
          letterSpacing: 0.5,
          color: "#665444",
          fontSize: 26,
          textAlign: "center",
          fontFamily: "sans-serif-medium",
        }}
      >
        Meow Meow Yay!
      </Text>
      <Text
        style={{
          color: "#665444",
          fontSize: 15,
          textAlign: "center",
          fontFamily: "sans-serif-medium",
          marginTop: 20,
        }}
      >
        Your booking has been confirmed,{" "}
        {userData.name ? userData.name : userData.username}!
      </Text>
      <Text
        style={{
          color: "#665444",
          fontSize: 15,
          textAlign: "center",
          fontFamily: "sans-serif-medium",
          marginTop: 10,
          lineHeight: 23,
        }}
      >
        Booking ID: {"\n"}
        {route.params.paramkey}
      </Text>
      <Text
        style={{
          color: COLORS.primary,
          fontSize: 15,
          textAlign: "center",
          fontFamily: "sans-serif-medium",
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
