import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import firebaseErrors from "../../../firebaseErrors";
import uuid from "uuid";
import {
  firestore,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "../../../firebase";

const AdminEditRoom = ({ navigation, route }) => {
  const [date, setDate] = useState("");
  const [roomsData, setRoomsData] = useState("");
  const [roomImage, setRoomImage] = useState("");

  const getRooms = async () => {
    const roomRef = firestore.collection("rooms").doc(route.params.paramkey);
    const doc = await roomRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setRoomsData(doc.data());
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
      setRoomImage(pickerResult);
    }

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setRoomImage({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setRoomImage(uploadUrl);
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
    firestore
      .collection("rooms")
      .doc(route.params.paramkey)
      .update({
        roomnName: roomsData.roomName,
        roomDetail: roomsData.roomDetail,
        roomPrice: roomsData.roomPrice,
        roomPax: roomsData.roomPax,
        roomImage: roomImage,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Rooms Details Updated!",
          "The room details has been updated successfully :3"
        );
      })
      .catch((error) => {
        alert(firebaseErrors[error.code] || error.message);
      });

    navigation.replace("AdminRoomPage");
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.adminBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
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
                    source={
                      roomImage
                        ? { uri: roomImage }
                        : { uri: roomsData.roomImage }
                    }
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
              color: "#665444",
              marginLeft: 5,
              marginBottom: 5,
            }}
          >
            Room Name
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon3 name="bed" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="Room Name"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={roomsData ? roomsData.roomName : ""}
                onChangeText={(text) =>
                  setRoomsData({ ...roomsData, roomName: text })
                }
              ></TextInput>
            </View>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              color: "#4b5142",
              marginTop: 10,
              marginLeft: 5,
              marginBottom: 5,
            }}
          >
            Room Details
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon3 name="information-circle" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="Room Details"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                numberOfLines={4}
                autoCorrect={false}
                value={roomsData ? roomsData.roomDetail : ""}
                onChangeText={(text) =>
                  setRoomsData({ ...roomsData, roomDetail: text })
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
            Room Price
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon3 name="md-logo-usd" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="Room Price"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={roomsData ? roomsData.roomPrice : ""}
                onChangeText={(text) =>
                  setRoomsData({ ...roomsData, roomPrice: text })
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
            Room Pax
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon3 name="md-heart-circle-outline" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                placeholder="Room Pax"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={roomsData ? roomsData.roomPax : ""}
                onChangeText={(text) =>
                  setRoomsData({ ...roomsData, roomPax: text })
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

export default AdminEditRoom;

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
    height: 50,
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
    height: 50,
    alignItems: "center",
    marginLeft: 20,
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
    backgroundColor: COLORS.adminPrimary,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
