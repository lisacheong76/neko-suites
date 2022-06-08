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

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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

        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Homepage"
          component={Homepage}
        /> */}

        <Stack.Screen
          options={{ headerShown: false }}
          name="Dashboard"
          component={Dashboard}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomDetails"
          component={RoomDetails}
        />

        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="RoomDetails2"
          component={RoomDetails2}
        /> */}

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
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
          options={{ headerShown: false }}
          name="AdminAddCats"
          component={AdminAddCats}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminCustomerPage"
          component={AdminCustomerPage}
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
              backgroundColor: COLORS.primary,
            },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() =>
                  navigation.replace("AdminAddCats", {
                    paramkey: route.params.paramkey,
                  })
                }
              >
                <Icon
                  name="add"
                  size={27}
                  color={"#fff"}
                  style={{ paddingTop: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
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
          options={{ headerShown: false }}
          name="ServiceLists"
          component={ServiceLists}
        />

        <Stack.Screen name="AdminProfile" component={AdminProfile} />

        <Stack.Screen name="EditAdminProfile" component={EditAdminProfile} />

        <Stack.Screen
          name="AdminChangePassword"
          component={AdminChangePassword}
        />

        <Stack.Screen
          name="UserChangePassword"
          component={UserChangePassword}
          options={{
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
          }}
        />

        <Stack.Screen name="CatPage" component={CatPage} />

        <Stack.Screen
          // options={{ headerShown: false }}
          name="CatDetails"
          component={CatDetails}
        />

        <Stack.Screen
          name="AddCats"
          component={AddCats}
          options={{
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
          }}
        />

        <Stack.Screen
          name="EditCatDetails"
          component={EditCatDetails}
          options={{
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
            // headerLeft: () => (
            //   <TouchableOpacity
            //     style={{ marginLeft: SIZES.padding }}
            //     onPress={ () => { navigation.goBack() }}
            //   >
            //     <Icon
            //       name="arrow-back-ios"
            //       size={23}
            //       color={"#fff"}
            //       style={{ marginLeft: -20 }}
            //     />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Stack.Screen
          name="Homepage"
          component={TabBar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChooseCat"
          component={ChooseCat}
          options={{
            headerTitleAlign: "center",
            title: "CAT TO BE BOARD",
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
          name="ChooseDate"
          component={ChooseDate}
          options={{
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
          }}
        />

        <Stack.Screen
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
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
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
          }}
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
