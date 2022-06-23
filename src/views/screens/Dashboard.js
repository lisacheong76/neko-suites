import { useNavigation } from "@react-navigation/core";
import React, { Component, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ImageBackground,
  LogBox,
} from "react-native";
import { Header } from "react-native-elements";
import COLORS from "../../consts/colors";
import { auth } from "../../../firebase";

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const photo = auth.currentUser.photoURL;

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Item = ({ title }) => (
    <View style={style.item}>
      <Text style={style.title}>{title}</Text>
    </View>
  );

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.adminBackground }}>
      <ScrollView>
        <Header
          backgroundColor="#97ad86"
          placement="center"
          centerComponent={{
            text: "DASHBOARD",
            style: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              paddingTop: 10,
            },
          }}
          rightComponent={
            <TouchableOpacity
              onPress={() => navigation.replace("AdminProfile")}
            >
              <ImageBackground
                source={{ uri: photo }}
                style={{ width: 38, height: 38 }}
                imageStyle={{ borderRadius: 25 }}
              />
            </TouchableOpacity>
          }
        />
        <View style={style.header}>
          <View>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#4b5142" }}
            >
              Welcome Admin
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={style.menuButton}
            onPress={() => navigation.navigate("AdminBookingPage")}
          >
            <Image
              source={require("../../assets/event.png")}
              resizeMode="center"
              style={style.menuImage2}
            />
            <Text style={style.menuText}>Manage Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.menuButton}
            onPress={() => navigation.navigate("AdminCustomerPage")}
          >
            <Image
              source={require("../../assets/customers.png")}
              resizeMode="center"
              style={style.menuImage3}
            />
            <Text style={style.menuText}>Manage Customers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.menuButton}
            onPress={() => navigation.navigate("AdminPickup")}
          >
            <Image
              source={require("../../assets/pickup-truck.png")}
              resizeMode="center"
              style={style.menuImage}
            />
            <Text style={style.menuText}>Manage Pickup</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={style.menuButton}
            onPress={() => navigation.navigate("AdminRoomPage")}
          >
            <Image
              source={require("../../assets/animal-shelter.png")}
              resizeMode="center"
              style={style.menuImage}
            />
            <Text style={style.menuText}>Manage Rooms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.menuButton}
            onPress={() => navigation.navigate("AdminViewFeedback")}
          >
            <Image
              source={require("../../assets/feedback.png")}
              resizeMode="center"
              style={style.menuImage2}
            />
            <Text style={style.menuText}>View Feedbacks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const style = StyleSheet.create({
  button: {
    backgroundColor: "#e8a468",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    fontSize: 32,
  },
  item: {
    borderBottomColor: "#f7d1b0",
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: "sans-serif",
  },
  menuButton: {
    alignItems: "center",
    backgroundColor: "#d7e3d1",
    borderColor: "#e0c3a8",
    borderRadius: 5,
    height: 150,
    width: 116,
    marginLeft: 16,
    marginTop: 20,
  },
  menuImage: {
    marginTop: 20,
    width: 50,
    height: 80,
  },
  menuImage2: {
    marginTop: 20,
    width: 45,
    height: 80,
  },
  menuImage3: {
    marginTop: 20,
    width: 45,
    height: 80,
  },
  menuText: {
    fontSize: 12,
    marginTop: -10,
    textAlign: "center",
  },
});
