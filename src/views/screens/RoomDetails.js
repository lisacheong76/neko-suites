import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { firestore, auth } from "../../../firebase";

const RoomDetails = ({ navigation, route }) => {
  const item = route.params;
  const [roomData, setRoomData] = useState("");

  const getRoom = async () => {
    const userRef = firestore.collection("rooms").doc(item);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setRoomData(doc.data());
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  const handleAdd = async () => {
    firestore
      .collection("booking")
      .add({
        roomID: item,
        roomName: roomData.roomName,
        cats: "",
        pax: "",
        start: "",
        end: "",
        service: "",
        pickup: "",
        by: auth.currentUser.uid,
        completed: false,
      })
      .then((docRef) => {
        const id = docRef.id;
        navigation.navigate("ChooseCat", {
          paramkey: id,
        });
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={style.headerImage}
        source={{ uri: roomData.roomImage }}
      >
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {roomData.roomName}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ lineHeight: 20, color: COLORS.grey }}>
              {roomData.roomDetail}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Price per night
          </Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
              }}
            >
              RM {roomData.roomPrice}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: COLORS.grey,
                marginLeft: 5,
              }}
            ></Text>
          </View>
        </View>
        <View style={style.btn}>
          <TouchableOpacity onPress={handleAdd} style={style.button}>
            <Text style={style.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#e8a468",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default RoomDetails;
