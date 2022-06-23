import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { firestore } from "../../../firebase";

const AdminViewCustomer = ({ navigation, route }) => {
  const [userData, setUserData] = useState("");

  const getUser = async () => {
    const userRef = firestore.collection("users").doc(route.params.paramkey);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setUserData(doc.data());
    }
  };

  useEffect(() => {
    getUser();
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
        source={{ uri: userData.image }}
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
            {userData.name}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Gender</Text>
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
              {userData.gender ? userData.gender : "Gender not set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name</Text>
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
              {userData.name ? userData.name : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Username</Text>
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
              @{userData.username ? userData.username : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Phone</Text>
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
              {userData.phone ? userData.phone : "Not Set"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        ></View>
        <View style={style.button}>
          <Text
            style={style.buttonText}
            onPress={() =>
              navigation.replace("AdminCCatPage", {
                paramkey: route.params.paramkey,
              })
            }
          >
            View Cats
          </Text>
        </View>

        <View style={style.button2}>
          <Text
            style={style.buttonText2}
            onPress={() =>
              navigation.replace("AdminAddBookings", {
                paramkey: route.params.paramkey,
              })
            }
          >
            Add Booking
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
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
  button2: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.adminPrimary,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText2: {
    color: COLORS.adminPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AdminViewCustomer;
