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

const ChooseOption = ({ route }) => {
  const navigation = useNavigation();
  const [optionData, setOptionData] = useState("");

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
          Add-on Service
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="heart-plus" color="#665444" size={20} />
            <Picker
              selectedValue={optionData.addOn}
              style={{ height: 50, width: 290, marginLeft: 20 }}
              onValueChange={(itemValue) =>
                setOptionData({ ...optionData, addOn: itemValue })
              }
            >
              <Picker.Item label="Not Set" value="" />
              <Picker.Item label="Grooming" value="Grooming" />
              <Picker.Item label="Wellness Cat Spa" value="Wellness" />
              <Picker.Item label="Beauty Cat Spa" value="Beauty" />
              <Picker.Item label="Flea Treatment" value="Flea" />
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
          Pickup Service
        </Text>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="car-side" color="#665444" size={20} />
            <Picker
              selectedValue={optionData.pickup}
              style={{ height: 50, width: 290, marginLeft: 20 }}
              onValueChange={(itemValue) =>
                setOptionData({ ...optionData, pickup: itemValue })
              }
            >
              <Picker.Item label="Not Set" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChooseOption")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
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
});

export default ChooseOption;
