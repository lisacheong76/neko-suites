import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/views/screens/Login";
import Homepage from "./src/views/screens/Homepage";
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
import CatPage from './src/views/screens/CatPage';
import CatDetails from './src/views/screens/CatDetails';
import AddCats from './src/views/screens/AddCats';
import EditCatDetails from "./src/views/screens/EditCatDetails";

const Stack = createNativeStackNavigator();

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

        <Stack.Screen
          options={{ headerShown: false }}
          name="Homepage"
          component={Homepage}
        />

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

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="EditUserProfile"
          component={EditUserProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ServiceLists"
          component={ServiceLists}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminProfile"
          component={AdminProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="EditAdminProfile"
          component={EditAdminProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminChangePassword"
          component={AdminChangePassword}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserChangePassword"
          component={UserChangePassword}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="CatPage"
          component={CatPage}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="CatDetails"
          component={CatDetails}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="AddCats"
          component={AddCats}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="EditCatDetails"
          component={EditCatDetails}
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
