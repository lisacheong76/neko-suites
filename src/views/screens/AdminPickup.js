import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../consts/colors";
import { firestore } from "../../../firebase";

const AdminCustomerPage = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState("");

  const bookingRef = firestore.collection("booking").where("pickup", "!=", "");

  useEffect(async () => {
    bookingRef.onSnapshot((querySnapshot) => {
      const bookingArray = [];
      querySnapshot.forEach((doc) => {
        const { address, by, cats, end, pax, phone, pickup, start } =
          doc.data();
        bookingArray.push({
          id: doc.id,
          address,
          by,
          cats,
          end,
          pax,
          phone,
          pickup,
          start,
        });
      });
      setBookingData(bookingArray);
    });

    const userRef = firestore.collection("users").doc(doc.data().by);
    const docUser = await userRef.get();
    if (!docUser.exists) {
      console.log("No such document!");
    } else {
      setUserData(docUser.data());
    }
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        {/* <Image source={{}} style={{ height: 80, width: 80 }} /> */}
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
            Request From: {item.start} - {item.end}
          </Text>
          {/* <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 9 }}>
            Room Type
          </Text> */}
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
          Pickup / Return List
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={bookingData}
          renderItem={({ item }) => <CartCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
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
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default AdminCustomerPage;