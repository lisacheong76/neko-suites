import { StyleSheet, LogBox, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabBar from "./src/navigation/TabBar";
import COLORS from "./src/consts/colors";
import SIZES from "./src/consts/sizes";
import Icon from "react-native-vector-icons/MaterialIcons";

import Login from "./src/views/screens/Login";
import Register from "./src/views/screens/Register";
import Dashboard from "./src/views/screens/Dashboard";
import ResetPassword from "./src/views/screens/ResetPassword";
import RoomDetails from "./src/views/screens/RoomDetails";
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
import Pickup from "./src/views/screens/Pickup";
import ChooseCat from "./src/views/screens/ChooseCat";
import ChooseDate from "./src/views/screens/ChooseDate";
import AdminPickup from "./src/views/screens/AdminPickup";
import AdminCustomerPage from "./src/views/screens/AdminCustomerPage";
import AdminViewCustomer from "./src/views/screens/AdminViewCustomer";
import AdminCCatPage from "./src/views/screens/AdminCCatPage";
import AdminBookingPage from "./src/views/screens/AdminBookingPage";
import AdminViewBooking from "./src/views/screens/AdminViewBooking";
import BookingHistoryDetails from "./src/views/screens/BookingHistoryDetails";
import UserFeedback from "./src/views/screens/UserFeedback";
import AdminEditCats from "./src/views/screens/AdminEditCats";
import AdminViewFeedback from "./src/views/screens/AdminViewFeedback";
import AdminAddBookings from "./src/views/screens/AdminAddBookings";
import AdminAddBookingsDate from "./src/views/screens/AdminAddBookingsDate";
import AdminAddBookingsRoom from "./src/views/screens/AdminAddBookingsRoom";
import BookingSuccess from "./src/views/screens/BookingSuccess";
import AdminViewPickup from "./src/views/screens/AdminViewPickup";
import AdminRoomDetails from "./src/views/screens/AdminRoomDetails";
import AdminRoomPage from "./src/views/screens/AdminRoomPage";
import AddRoom from "./src/views/screens/AddRoom";
import AdminEditRoom from "./src/views/screens/AdminEditRoom";

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
          name="UserProfile"
          component={UserProfile}
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
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Homepage");
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: (onPress) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("EditUserProfile")}
              >
                <Icon name="edit" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
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
          name="Pickup"
          component={Pickup}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "PICKUP SERVICE",
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
                  navigation.navigate("Homepage");
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
          })}
        />

        <Stack.Screen
          name="BookingHistoryDetails"
          component={BookingHistoryDetails}
          options={{ headerShown: false }}
        />

        {/*------------- Admin Section -------------*/}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Dashboard"
          component={Dashboard}
        />

        <Stack.Screen
          name="AdminViewBooking"
          component={AdminViewBooking}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AdminViewPickup"
          component={AdminViewPickup}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "PICKUP DETAILS",
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
                  navigation.navigate("AdminPickup");
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
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
          name="AdminPickup"
          component={AdminPickup}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "PICKUP / RETURN",
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
          name="AdminAddBookingsRoom"
          component={AdminAddBookingsRoom}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ADD ROOM",
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
          name="BookingSuccess"
          component={BookingSuccess}
          options={{ headerShown: false }}
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

        <Stack.Screen
          name="AdminRoomPage"
          component={AdminRoomPage}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ROOMS",
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
                  navigation.navigate("Dashboard");
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.replace("AddRoom")}>
                <Icon name="add" size={25} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AddRoom"
          component={AddRoom}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "ADD ROOM",
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
                  navigation.navigate("AdminRoomPage");
                }}
              >
                <Icon name="arrow-back-ios" size={23} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminRoomDetails"
          component={AdminRoomDetails}
        />

        <Stack.Screen
          name="AdminEditRoom"
          component={AdminEditRoom}
          options={({ navigation, route }) => ({
            headerTitleAlign: "center",
            title: "EDIT ROOM",
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
