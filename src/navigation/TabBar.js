import React from "react";
import { Image, TouchableOpacity, ImageBackground, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialIcons";

import Homepage from "../views/screens/Homepage";

import COLORS from "../consts/colors";
import SIZES from "../consts/sizes";

import icons from "../consts/icons";
import UserProfile from "../views/screens/UserProfile";
import RoomDetails from "../views/screens/RoomDetails";
import CatPage from "../views/screens/CatPage";
import AddCats from "../views/screens/AddCats";
import BookingPage from "../views/screens/BookingPage";
import ChooseDate from "../views/screens/ChooseDate";
import { auth } from "../../firebase";

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
};

const TabBar = () => {
  const navigation = useNavigation();
  const photo = auth.currentUser.photoURL;

  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.darkbrown;

          switch (route.name) {
            case "Homepage":
              return (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Booking":
              return (
                <Image
                  source={icons.booking}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 27,
                    height: 27,
                  }}
                />
              );
            case "Cats":
              return (
                <Image
                  source={icons.catprofile}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Account":
              return (
                <Image
                  source={icons.user}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 27,
                    height: 27,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          headerTitleAlign: "center",
          title: "NEKO SUITES",
          headerTitleStyle: {
            color: "#FFF",
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "roboto",
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerRight: ({ onPress }) => (
            <TouchableOpacity
            style={{ paddingRight: 15 }}
            onPress={() => navigation.replace("UserProfile")}
          >
            <ImageBackground
              source={{ uri: photo }}
              style={{ width: 38, height: 38 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingPage}
        options={{
          headerTitleAlign: "center",
          title: "BOOKING",
          headerTitleStyle: {
            color: "#FFF",
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "roboto",
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          }
        }}
      />
      <Tab.Screen
        name="Cats"
        component={CatPage}
        options={{
          headerTitleAlign: "center",
          title: "MY CATS",
          headerTitleStyle: {
            color: "#FFF",
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "roboto",
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: SIZES.padding }}
              onPress={() => navigation.navigate("AddCats")}
            >
              <Icon
                name="add"
                size={23}
                color={"#fff"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserProfile}
        options={{
          headerTitleAlign: "center",
          title: "MY PROFILE",
          headerTitleStyle: {
            color: "#FFF",
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "roboto",
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerRight: (onPress) => (
            <TouchableOpacity
              style={{ marginRight: SIZES.padding }}
              onPress={() => navigation.navigate("EditUserProfile")}
            >
              <Icon
                name="edit"
                size={23}
                color={"#fff"}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
