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
// import { PrimaryButton } from "../../consts/button";
import hotels from "../../consts/roomType";
import { firestore } from "../../../firebase";
import firebaseErrors from "../../../firebaseErrors";

const AdminAddBookingsRoom = ({ route, navigation }) => {
  const [rooms, setRooms] = useState("");

  const handleUpdate = async (item) => {
    firestore
      .collection("booking")
      .doc(route.params.paramkey)
      .update({
        roomID: item.id,
        roomName: item.roomName,
        completed: false,
      })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        alert(firebaseErrors[error.code] || error.message);
      });

    navigation.navigate("AdminAddBookingsDate", {
      paramkey: route.params.paramkey,
    });
  };

  const roomRef = firestore.collection("rooms").orderBy("roomName");

  useEffect(async () => {
    roomRef.onSnapshot((querySnapshot) => {
      const roomArray = [];
      querySnapshot.forEach((doc) => {
        const { roomName, roomDetail, roomPax, roomPrice, roomImage } =
          doc.data();
        roomArray.push({
          id: doc.id,
          roomName,
          roomPax,
          roomDetail,
          roomPrice,
          roomImage,
        });
      });
      setRooms(roomArray);
    });
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image
          source={{ uri: item.roomImage }}
          style={{ height: 80, width: 80 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.roomName ? item.roomName : "Name not set"}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            RM {item.roomPrice ? item.roomPrice : "Price not set"}
          </Text>
          {/* <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            @{item.username}
          </Text> */}
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Icon3
            name="plus"
            size={23}
            color={COLORS.adminFont}
            onPress={() => handleUpdate(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.adminBackground, flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={rooms}
        renderItem={({ item }) => <CartCard item={item} />}
      />
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

export default AdminAddBookingsRoom;
