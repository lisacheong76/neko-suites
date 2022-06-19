import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon2 from "react-native-vector-icons/MaterialIcons";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  auth,
  firestore,
  getStorage,
  ref,
  getDownloadURL,
} from "../../../firebase";

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
          <Icon2
            name="edit"
            size={23}
            color={"#665444"}
            onPress={() =>
              navigation.replace("EditRoomDetails", {
                paramkey: route.params.paramkey,
              })
            }
          />
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Room Details</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
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
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              RM {roomsData.roomPrice ? roomsData.roomPrice : "Not Set"}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Vaccinated</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.vaccinated ? catData.vaccinated : "Not Set"}
            </Text>
          </View>
        </View> */}
        {/* <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Neutered / Spayed
          </Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.neutered ? catData.neutered : "Not Set"}
            </Text>
          </View>
        </View> */}
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
                color: "#665444",
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
            Delete Cat
          </Text>
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

  ages: {
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
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
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
    // marginHorizontal: 20,
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
    backgroundColor: COLORS.primary,
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