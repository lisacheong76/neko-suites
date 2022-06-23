import React, { useState, useEffect } from "react";
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
import {
  auth,
  firestore,
  updatePassword,
  getStorage,
  ref,
  getDownloadURL,
} from "../../../firebase";

const AdminChangePassword = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const displayName = auth.currentUser.displayName;
  const photo = auth.currentUser.photoURL;

  const [userData, setUserData] = useState("");
  const [url, setUrl] = useState("");

  const getUser = async () => {
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setUserData(doc.data());
    }
  };

  const getPhoto = async () => {
    const storage = getStorage();
    const reference = ref(storage, photo);
    await getDownloadURL(reference).then((x) => {
      setUrl(x);
    });
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
      navigation.replace("AdminProfile");
    } else {
      alert("The passwords are different :<");
    }
  };

  const handleBack = () => {
    navigation.replace("AdminProfile");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.adminBackground }}>
      <ScrollView>
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
                    color: COLORS.adminFont,
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
              <Icon name="key" color={COLORS.adminFont} size={20} />
              <TextInput
                style={styles.editTextBox}
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
                    color={COLORS.adminFont}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              ></TextInput>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="key-change" color={COLORS.adminFont} size={20} />
              <TextInput
                style={styles.editTextBox}
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
                    color={COLORS.adminFont}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminChangePassword;

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
    backgroundColor: COLORS.adminSecondary,
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
    backgroundColor: COLORS.adminSecondary,
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
    marginTop: 160,
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
