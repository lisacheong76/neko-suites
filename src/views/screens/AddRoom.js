import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Picker,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import DatePicker from "react-native-datepicker";
import { Header } from "react-native-elements";
import COLORS from "../../consts/colors";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as ImagePicker from "expo-image-picker";
import firebaseErrors from "../../../firebaseErrors";
import uuid from "uuid";
import {
  auth,
  firestore,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "../../../firebase";

const AddRoom = ({ route }) => {
  const navigation = useNavigation();
  const [roomData, setRoomData] = useState("");
  const [roomImage, setImage] = useState("");

  const photo = auth.currentUser.photoURL;

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
      // this.setState({ uploading: true });
      setImage({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        // this.setState({ image: uploadUrl });
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    }
  };

  const handleAddRoom = async () => {
    firestore.collection("rooms").add({
      roomName: roomData.roomName,
      roomDetail: roomData.roomDetail,
      roomPrice: roomData.roomPrice,
      roomPax: roomData.roomPax,
      roomImage: roomImage,
    });

    navigation.replace("AdminRoomPage");
  };

  // useEffect(() => {
  //   getCat();
  // }, []);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.adminBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.adminSecondary,
                borderRadius: 50,
                height: 95,
                width: 95,
                alignSelf: "center",
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
                        : { uri: roomData.roomImage }
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
                        color="white"
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
                  marginTop: 5,
                  marginBottom: 5,
                  color: "#665444",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Upload Photo
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
                value={roomData ? roomData.roomName : ""}
                onChangeText={(text) =>
                  setRoomData({ ...roomData, roomName: text })
                }
              ></TextInput>
            </View>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              color: "#665444",
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
                value={roomData ? roomData.roomDetail : ""}
                onChangeText={(text) =>
                  setRoomData({ ...roomData, roomDetail: text })
                }
              ></TextInput>
            </View>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              color: "#665444",
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
                value={roomData ? roomData.roomPrice : ""}
                onChangeText={(text) =>
                  setRoomData({ ...roomData, roomPrice: text })
                }
              ></TextInput>
            </View>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              color: "#665444",
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
                value={roomData ? roomData.roomPax : ""}
                onChangeText={(text) =>
                  setRoomData({ ...roomData, roomPax: text })
                }
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleAddRoom}>
            Save Room
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
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
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
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
    paddingLeft: 20,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  datePickerStyle: {
    width: 310,
  },
});
