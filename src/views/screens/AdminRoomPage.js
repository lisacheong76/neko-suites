import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import COLORS from "../../consts/colors";
import { firestore, auth } from "../../../firebase";

const AdminRoomPage = () => {
  const navigation = useNavigation();
  const [room, setRooms] = useState([]);
  const [numCols, setColumnNo] = useState(2);

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

  room.sort((a, b) => {
    return a.roomPrice - b.roomPrice;
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.adminBackground,
        paddingTop: 20,
      }}
    >
      <View style={styles.container}>
        <FlatList
          data={room}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          key={numCols}
          numColumns={numCols}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate("AdminRoomDetails", { paramkey: item.id })
              }
            >
              <Animated.View style={styles.CatsCard}>
                <Image
                  style={styles.CatsCardImage}
                  source={{ uri: item.roomImage }}
                />
                <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.roomName}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default AdminRoomPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 13,
  },
  button: {
    backgroundColor: "#e8a468",
    width: 150,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  CatsCard: {
    height: 160,
    width: Dimensions.get("window").width / 2.4,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 13,
    borderRadius: 10,
    marginTop: 15,
  },
  CatsCardImage: {
    height: 105,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
