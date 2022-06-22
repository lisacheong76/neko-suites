import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../consts/colors";
import { auth, firestore } from "../../../firebase";

const BookingPage = ({ navigation }) => {
  const [booking, setBooking] = useState([]);

  const bookingRef = firestore
    .collection("booking")
    .where("by", "==", auth.currentUser.uid)
    .orderBy("start");

  useEffect(async () => {
    bookingRef.onSnapshot((querySnapshot) => {
      const bookingArray = [];
      querySnapshot.forEach((doc) => {
        const { cats, start, end, service, pickup } = doc.data();
        bookingArray.push({
          id: doc.id,
          cats,
          start,
          end,
          service,
          pickup,
        });
      });
      setBooking(bookingArray);
    });
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: -10 }}>
            Booking ID : {item.id}
          </Text>
          <Text style={{ fontSize: 15, color: COLORS.grey, marginTop: 10 }}>
            {item.start} - {item.end}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Icon3
            name="arrow-right"
            size={23}
            color={"#665444"}
            onPress={() =>
              navigation.navigate("BookingHistoryDetails", {
                paramkey: item.id,
              })
            }
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.secondary, flex: 1, paddingTop: 20 }}
    >
      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: "#665444",
            marginLeft: 23,
            fontSize: 17,
          }}
        >
          All Bookings
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={booking}
          renderItem={({ item }) => <CartCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  cartCard: {
    height: 130,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default BookingPage;
