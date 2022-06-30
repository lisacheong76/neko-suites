import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Avatar, Title, Caption, Text, TextInput } from "react-native-paper";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebaseErrors from "../../../firebaseErrors";
import { auth, firestore, updatePassword } from "../../../firebase";
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";

const UserChangePassword = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const displayName = auth.currentUser.displayName;
  const photo = auth.currentUser.photoURL;

  const [userData, setUserData] = useState("");

  const getUser = async () => {
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setUserData(doc.data());
    }
  };

  const handleUpdate = async () => {
    if (password == password2) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          Alert.alert(
            "Password Updated!",
            "Your password has been updated successfully :3"
          );
        })
        .catch((error) => {
          alert(firebaseErrors[error.code] || error.message);
        });
      navigation.replace("UserProfile");
    } else {
      alert("The passwords are different :<");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar.Image source={{ uri: photo }} size={90} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                    color: "#665444",
                  },
                ]}
              >
                {userData.name}
              </Title>
              <Caption style={styles.caption}>@{displayName}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="key" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                underlineColor={"transparent"}
                secureTextEntry={passwordVisible}
                placeholder="New Password"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={
                  <TextInput.Icon
                    name={passwordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="#665444"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              ></TextInput>
            </View>
          </View>
          <PasswordStrengthMeterBar password={password} />
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="key-change" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                underlineColor={"transparent"}
                secureTextEntry={passwordVisible2}
                placeholder="Confirm New Password"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={password2}
                onChangeText={(text) => setPassword2(text)}
                right={
                  <TextInput.Icon
                    name={passwordVisible2 ? "eye" : "eye-off"}
                    size={20}
                    color="#665444"
                    onPress={() => setPasswordVisible2(!passwordVisible2)}
                  />
                }
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleUpdate}>
            Save Edit
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserChangePassword;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 13,
  },
  textBox: {
    height: 40,
    alignItems: "center",
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
  },
  editTextBox: {
    height: 40,
    alignItems: "center",
    paddingLeft: 10,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    fontSize: 15,
  },
  button: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 170,
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
