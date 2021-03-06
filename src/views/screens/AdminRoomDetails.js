import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { firestore } from "../../../firebase";

const AdminRoomDetails = ({ navigation, route }) => {
  const [roomsData, setRoomsData] = useState("");
  const [userData, setUserData] = useState("");

  const handleDelete = async () => {
    firestore
      .collection("rooms")
      .doc(route.params.paramkey)
      .delete()
      .then(() => {
        console.log("Doc deleted");
        Alert.alert(
          "Room Details Deleted!",
          "The room details has been deleted successfully :3"
        );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    navigation.replace("AdminRoomPage");
  };

  const getRooms = async () => {
    const roomsRef = firestore.collection("rooms").doc(route.params.paramkey);
    const doc = await roomsRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setRoomsData(doc.data());
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

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
        source={{ uri: roomsData.roomImage }}
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
        <View style={style.iconContainer}>
          <Icon
            name="edit"
            color={COLORS.white}
            size={28}
            onPress={() =>
              navigation.replace("AdminEditRoom", {
                paramkey: route.params.paramkey,
              })
            }
          />
        </View>
        <View style={style.header2}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {roomsData.roomName}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></View>
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
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {roomsData.roomDetail ? roomsData.roomDetail : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Room Price</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              RM {roomsData.roomPrice ? roomsData.roomPrice : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Room Pax</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {roomsData.roomPax ? roomsData.roomPax : "Not Set"}
            </Text>
          </View>
        </View>
        <View style={style.button}>
          <Text style={style.buttonText} onPress={handleDelete}>
            Delete Room
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.adminPrimary,
    top: -20,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
  header2: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    backgroundColor: COLORS.adminPrimary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AdminRoomDetails;
