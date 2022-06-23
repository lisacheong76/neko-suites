import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../consts/colors";
import { firestore } from "../../../firebase";

const AdminBookingPage = ({ navigation }) => {
  const [booking, setBooking] = useState([]);

  const bookingRef = firestore.collection("booking");

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
            color={"#4b5142"}
            onPress={() =>
              navigation.navigate("AdminViewBooking", { paramkey: item.id })
            }
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.adminBackground,
        flex: 1,
        paddingTop: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: COLORS.adminFont,
            marginLeft: 23,
            fontSize: 17,
            marginBottom: 5,
          }}
        >
          Booking List
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
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

export default AdminBookingPage;
