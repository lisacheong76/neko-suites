import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../consts/colors";
import { firestore } from "../../../firebase";

const AdminCustomerPage = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const userRef = firestore
    .collection("users")
    .where("role", "==", "Customer")
    .orderBy("username");

  useEffect(async () => {
    userRef.onSnapshot((querySnapshot) => {
      const userArray = [];
      querySnapshot.forEach((doc) => {
        const { name, username, phone, image } = doc.data();
        userArray.push({
          id: doc.id,
          name,
          username,
          phone,
          image,
        });
      });
      setUsers(userArray);
    });
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.name ? item.name : item.username}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.phone ? item.phone : "Phone not set"}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Icon3
            name="arrow-right"
            size={23}
            color={COLORS.adminFont}
            onPress={() =>
              navigation.navigate("AdminViewCustomer", { paramkey: item.id })
            }
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.adminBackground, flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({ item }) => <CartCard item={item} />}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AdminCustomerPage;
