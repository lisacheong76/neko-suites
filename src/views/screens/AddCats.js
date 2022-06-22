import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Picker,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Text, TextInput } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as ImagePicker from "expo-image-picker";
// import firebaseErrors from "../../../firebaseErrors";
import uuid from "uuid";
import {
  auth,
  firestore,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "../../../firebase";

const AddCats = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState("");
  const [catData, setCatData] = useState("");
  const [image, setImage] = useState("");

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

  const handleAdd = async () => {
    firestore.collection("cats").add({
      name: catData.name,
      gender: catData.gender,
      birthdate: date,
      allergy: catData.allergy,
      vaccinated: catData.vaccinated,
      neutered: catData.neutered,
      owner: auth.currentUser.uid,
      image: image,
    });

    navigation.replace("CatPage");
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
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
                    source={image ? { uri: image } : { uri: catData.image }}
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
            Full Name *
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="cat" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="Name"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={catData ? catData.name : ""}
                onChangeText={(text) => setCatData({ ...catData, name: text })}
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
            Gender *
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="human-male-female" color="#665444" size={20} />
              <Picker
                selectedValue={catData.gender}
                style={{ height: 50, width: 290, marginLeft: 20 }}
                onValueChange={(itemValue) =>
                  setCatData({ ...catData, gender: itemValue })
                }
              >
                <Picker.Item label="Not Set" value="" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>
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
            Birth Date
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="cake-variant" color="#665444" size={20} />
              <DatePicker
                style={styles.datePickerStyle}
                date={date}
                mode="date"
                placeholder="Select date"
                format="DD/MM/YYYY"
                minDate="01-01-1900"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderColor: "#b3a396",
                    alignItems: "flex-start",
                    fontSize: 16,
                    marginLeft: 20,
                    borderWidth: 0,
                    borderBottomWidth: 0.6,
                  },
                  placeholderText: {
                    fontSize: 15,
                    color: "#666666",
                  },
                  dateText: {
                    fontSize: 17,
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
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
            Allergy *
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon3 name="add-circle" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                placeholder="Allergy"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={catData ? catData.allergy : ""}
                onChangeText={(text) =>
                  setCatData({ ...catData, allergy: text })
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
            Vaccinated *
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Fontisto name="injection-syringe" color="#665444" size={20} />
              <Picker
                selectedValue={catData.vaccinated}
                style={{ height: 50, width: 290, marginLeft: 20 }}
                onValueChange={(itemValue) =>
                  setCatData({ ...catData, vaccinated: itemValue })
                }
              >
                <Picker.Item label="Not Set" value="" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
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
            Neutered / Spayed *
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="hand-heart" color="#665444" size={20} />
              <Picker
                selectedValue={catData.neutered}
                style={{ height: 50, width: 290, marginLeft: 20 }}
                onValueChange={(itemValue) =>
                  setCatData({ ...catData, neutered: itemValue })
                }
              >
                <Picker.Item label="Not Set" value="" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleAdd}>
            Save Cat
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCats;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 35,
  },
  row: {
    flexDirection: "row",
    marginBottom: 13,
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
    paddingLeft: 20,
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
    backgroundColor: COLORS.primary,
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
