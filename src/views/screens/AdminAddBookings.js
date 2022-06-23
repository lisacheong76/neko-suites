import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { firestore } from "../../../firebase";

const AdminAddBookings = ({ route }) => {
  const navigation = useNavigation();
  const [bookingData, setBookingData] = useState("");

  const handleAdd = async () => {
    firestore
      .collection("booking")
      .add({
        roomID: "",
        roomName: "",
        cats: bookingData.cats,
        pax: bookingData.pax,
        start: "",
        end: "",
        service: "",
        pickup: "",
        by: route.params.paramkey,
        completed: false,
      })
      .then((docRef) => {
        const id = docRef.id;
        navigation.navigate("AdminAddBookingsRoom", {
          paramkey: id,
        });
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.adminBackground,
        paddingTop: 30,
      }}
    >
      <View style={styles.userInfoSection}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#4b514",
            marginLeft: 5,
            marginBottom: 5,
            fontSize: 15,
          }}
        >
          Number of cats to be board
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="heart-plus" color="#4b514" size={20} />
            <TextInput
              style={styles.editTextBox}
              borderColor="transparent"
              placeholder="Num of cats"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={bookingData ? bookingData.pax : ""}
              onChangeText={(text) =>
                setBookingData({ ...bookingData, pax: text })
              }
            ></TextInput>
          </View>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            color: "#4b514",
            marginLeft: 5,
            marginBottom: 5,
            marginTop: 15,
            fontSize: 15,
          }}
        >
          Cat Name
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="cat" color="#4b514" size={20} />
            <TextInput
              style={styles.editTextBox}
              borderColor="transparent"
              placeholder="Cat1 name, Cat2 name, ..."
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={bookingData ? bookingData.cats : ""}
              onChangeText={(text) =>
                setBookingData({ ...bookingData, cats: text })
              }
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity onPress={handleAdd} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
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
    marginTop: 280,
  },
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
    marginHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AdminAddBookings;
