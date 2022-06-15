import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Picker,
  Alert,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import style from "react-native-datepicker/style";
import { firestore } from "../../../firebase";
import firebaseErrors from "../../../firebaseErrors";

const ChooseCat = ({ route }) => {
  const navigation = useNavigation();
  const [bookingData, setBookingData] = useState("");
  const [userData, setUserData] = useState("");

  const handleUpdate = async () => {
    firestore
      .collection("booking")
      .doc(route.params.paramkey)
      .update({
        pickup: bookingData.pickup,
        phone: userData.phone,
        address: bookingData.address,
      })
      .then(() => {
        console.log("Success");
        Alert.alert(
          "Service Request Successful!",
          "We have receive your request :3"
        );
      })
      .catch((error) => {
        alert(firebaseErrors[error.code] || error.message);
      });

    navigation.navigate("BookingHistoryDetails", {
      paramkey: route.params.paramkey,
    });
  };

  const getBooking = async () => {
    const bookingRef = firestore
      .collection("booking")
      .doc(route.params.paramkey);
    const doc = await bookingRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setBookingData(doc.data());
    }

    const userRef = firestore.collection("users").doc(doc.data().by);
    const docUser = await userRef.get();
    if (!docUser.exists) {
      console.log("No such document!");
    } else {
      setUserData(docUser.data());
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 50 }}
    >
      <View style={styles.userInfoSection}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#665444",
            marginLeft: 5,
            marginBottom: 5,
            fontSize: 15,
          }}
        >
          Pickup / Return Service
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="cat" color="#665444" size={20} />
            <Picker
              selectedValue={bookingData.pickup}
              style={{ height: 50, width: 290, marginLeft: 15 }}
              onValueChange={(itemValue) =>
                setBookingData({ ...bookingData, pickup: itemValue })
              }
            >
              <Picker.Item label="No" value="No" />
              <Picker.Item label="Pickup Only" value="Pickup" />
              <Picker.Item label="Return Only" value="Return" />
              <Picker.Item label="Both" value="Both" />
            </Picker>
          </View>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            color: "#665444",
            marginLeft: 5,
            marginBottom: 5,
            marginTop: 15,
            fontSize: 15,
          }}
        >
          Phone
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="phone" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              borderColor="transparent"
              placeholder="Phone Number"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={userData ? userData.phone : ""}
              onChangeText={(text) => setUserData({ ...userData, phone: text })}
            ></TextInput>
          </View>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            color: "#665444",
            marginLeft: 5,
            marginBottom: 5,
            marginTop: 15,
            fontSize: 15,
          }}
        >
          Address
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="home" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              borderColor="transparent"
              placeholder="Home Address"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={bookingData ? bookingData.address : ""}
              onChangeText={(text) =>
                setBookingData({ ...bookingData, address: text })
              }
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={{ paddingBottom: 20, marginBottom: 120 }}>
            <TouchableOpacity onPress={handleUpdate} style={styles.button}>
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate} style={styles.button2}>
              <Text style={styles.buttonText2}>Cancel Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 250,
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
    marginHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  button2: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    backgroundColor: COLORS.background,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonText2: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ChooseCat;
