import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import firebaseErrors from "../../../firebaseErrors";
import uuid from "uuid";
import {
  auth,
  firestore,
  updateProfile,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "../../../firebase";

const EditAdminProfile = () => {
  const navigation = useNavigation();

  const photo = auth.currentUser.photoURL;

  const [userData, setUserData] = useState("");
  const [image, setImage] = useState("");
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName);

  const getUser = async () => {
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setUserData(doc.data());
    }
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log({ pickerResult });

    if (!pickerResult.cancelled) {
      setImage(pickerResult);
    }

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setImage({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // blob.close();

    return await getDownloadURL(fileRef);
  }

  const handleUpdate = async () => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: image,
    });

    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name: userData.name,
        phone: userData.phone,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Profile Updated!",
          "Your profile has been updated successfully :3"
        );
      })
      .catch((error) => {
        alert(firebaseErrors[error.code] || error.message);
      });

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
              <TouchableOpacity onPress={() => pickImage()}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={image ? { uri: image } : { uri: photo }}
                    style={{ height: 95, width: 95 }}
                    imageStyle={{ borderRadius: 50 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="camera"
                        size={33}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                  color: "#4b5142",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Change Photo
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#4b5142",
              marginLeft: 5,
              marginBottom: 5,
            }}
          >
            Username
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="account" color="#4b5142" size={20} />
              <TextInput
                style={styles.editTextBox}
                placeholder="Username"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={displayName || ""}
                editable={false}
                underlineColor="transparent"
              ></TextInput>
            </View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: "#4b5142",
              marginLeft: 5,
              marginBottom: 5,
            }}
          >
            Full Name
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="account-heart" color="#4b5142" size={20} />
              <TextInput
                style={styles.editTextBox}
                placeholder="Name"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={userData ? userData.name : ""}
                onChangeText={(text) =>
                  setUserData({ ...userData, name: text })
                }
              ></TextInput>
            </View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: "#4b5142",
              marginLeft: 5,
              marginBottom: 5,
            }}
          >
            Company Phone Number
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="phone" color="#4b5142" size={20} />
              <TextInput
                style={styles.editTextBox}
                placeholder="Company Phone Number"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={userData ? userData.phone : ""}
                onChangeText={(text) =>
                  setUserData({ ...userData, phone: text })
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

export default EditAdminProfile;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 35,
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
    marginTop: 70,
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
