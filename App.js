import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  LogBox,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabBar from "./src/navigation/TabBar";
import COLORS from "./src/consts/colors";
import SIZES from "./src/consts/sizes";
import Icon from "react-native-vector-icons/MaterialIcons";

import Login from "./src/views/screens/Login";
import Homepage from "./src/views/screens/Homepage";
import Register from "./src/views/screens/Register";
import Dashboard from "./src/views/screens/Dashboard";
import ResetPassword from "./src/views/screens/ResetPassword";
import RoomDetails from "./src/views/screens/RoomDetails";
// import RoomDetails2 from "./src/views/screens/RoomDetails2";
import UserProfile from "./src/views/screens/UserProfile";
import EditUserProfile from "./src/views/screens/EditUserProfile";
import ServiceLists from "./src/views/screens/ServiceLists";
import AdminProfile from "./src/views/screens/AdminProfile";
import EditAdminProfile from "./src/views/screens/EditAdminProfile";
import AdminChangePassword from "./src/views/screens/AdminChangePassword";
import UserChangePassword from "./src/views/screens/UserChangePassword";
import CatPage from "./src/views/screens/CatPage";
import CatDetails from "./src/views/screens/CatDetails";
import AddCats from "./src/views/screens/AddCats";
import EditCatDetails from "./src/views/screens/EditCatDetails";
import AdminCatPage from "./src/views/screens/AdminCatPage";
import AdminCatDetails from "./src/views/screens/AdminCatDetails";
import AdminAddCats from "./src/views/screens/AdminAddCats";
import ChooseCat from "./src/views/screens/ChooseCat";
import ChooseDate from "./src/views/screens/ChooseDate";
import ChooseOption from "./src/views/screens/ChooseOption";
import Checkout from "./src/views/screens/Checkout";
import AdminCustomerPage from "./src/views/screens/AdminCustomerPage";
import AdminViewCustomer from "./src/views/screens/AdminViewCustomer";
import AdminCCatPage from "./src/views/screens/AdminCCatPage";
import AdminBookingPage from "./src/views/screens/AdminBookingPage";
import BookingHistoryDetails from "./src/views/screens/BookingHistoryDetails";
import BookingPage from "./src/views/screens/BookingPage";
import UserFeedback from "./src/views/screens/UserFeedback";
import AdminEditCats from "./src/views/screens/AdminEditCats";
import AdminViewFeedback from "./src/views/screens/AdminViewFeedback";
import AdminAddBookings from "./src/views/screens/AdminAddBookings";
import AdminAddBookingsDate from "./src/views/screens/AdminAddBookingsDate";

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*--------- For page without header --------- */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />

        {/*------------- User Section -------------*/}
        <Stack.Screen
          name="Homepage"
          component={TabBar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomDetails"
          component={RoomDetails}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ServiceLists"
          component={ServiceLists}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
        />

        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={{
            headerTitleAlign: "center",
            title: "EDIT PROFILE",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />

        <Stack.Screen
          name="UserChangePassword"
          component={UserChangePassword}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CHANGE PASSWORD",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="UserFeedback"
          component={UserFeedback}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "FEEDBACK",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen name="CatPage" component={CatPage} />

        <Stack.Screen
          name="CatDetails"
          component={CatDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddCats"
          component={AddCats}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ADD CAT",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="EditCatDetails"
          component={EditCatDetails}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "EDIT CAT INFO",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="ChooseCat"
          component={ChooseCat}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CHOOSE YOUR CAT",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="ChooseDate"
          component={ChooseDate}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CHOOSE DATE",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
              // onPress={() => console.log("Menu")}
              >
                <Icon name="local-grocery-store" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CHECKOUT",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.replace("Homepage")}>
                <Icon name="home" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="BookingHistoryDetails"
          component={BookingHistoryDetails}
          options={({ navigation, route }) => ({
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
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        {/*------------- Admin Section -------------*/}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Dashboard"
          component={Dashboard}
        />

        <Stack.Screen
          name="AdminProfile"
          component={AdminProfile}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "MY PROFILE",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.replace("Dashboard");
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditAdminProfile");
                }}
              >
                <Icon name="edit" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="EditAdminProfile"
          component={EditAdminProfile}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "EDIT PROFILE",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminChangePassword"
          component={AdminChangePassword}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CHANGE PASSWORD",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminCatPage"
          component={AdminCatPage}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminCatDetails"
          component={AdminCatDetails}
        />

        <Stack.Screen
          name="AdminAddCats"
          component={AdminAddCats}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ADD CAT",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminCustomerPage"
          component={AdminCustomerPage}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CUSTOMERS",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminViewCustomer"
          component={AdminViewCustomer}
        />

        <Stack.Screen
          name="AdminCCatPage"
          component={AdminCCatPage}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "CATS",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.replace("AdminAddCats", {
                    paramkey: route.params.paramkey,
                  })
                }
              >
                <Icon name="add" size={25} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminEditCats"
          component={AdminEditCats}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "EDIT CAT INFO",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminBookingPage"
          component={AdminBookingPage}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "BOOKINGS",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminAddBookings")}
              >
                <Icon name="add" size={25} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminAddBookings"
          component={AdminAddBookings}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ADD BOOKINGS",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminAddBookingsDate"
          component={AdminAddBookingsDate}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ADD BOOKINGS",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminViewFeedback"
          component={AdminViewFeedback}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "VIEW FEEDBACKS",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.adminPrimary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="RoomDetails2"
          component={RoomDetails2}
        /> */}

        {/* <Stack.Screen
          name="ChooseOption"
          component={ChooseOption}
          options={{
            headerTitleAlign: "center",
            title: "CHOOSE OPTION",
            headerTitleStyle: {
              color: "#FFF",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "roboto",
            },
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
