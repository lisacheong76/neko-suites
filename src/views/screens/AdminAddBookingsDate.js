import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import COLORS from "../../consts/colors";
import { firestore } from "../../../firebase";

const AdminAddBookingsDate = ({ navigation, route }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  const handleUpdate = async () => {
    let startDate = new Date(selectedStartDate);
    let endDate = new Date(selectedEndDate);

    firestore
      .collection("booking")
      .doc(route.params.paramkey)
      .update({
        start: startDate.toDateString(),
        end: endDate.toDateString(),
        completed: true,
      })
      .then(() => {
        console.log("Success");
        Alert.alert("Successful!", "Booking has been made successfully :3");
      })
      .catch((error) => {
        alert(firebaseErrors[error.code] || error.message);
      });

    navigation.navigate("AdminCustomerPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          months={[
            "January",
            "Febraury",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          previousTitle="<"
          nextTitle=">"
          todayBackgroundColor="#e4ede2"
          selectedDayColor="#c5d2c4"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: "Cochin",
            color: "#000000",
          }}
          onDateChange={onDateChange}
        />
        {/* <View style={styles.textStyle}>
          <Text style={styles.textStyle}>Start Date :</Text>
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ""}
          </Text>
          <Text style={styles.textStyle}>End Date :</Text>
          <Text style={styles.textStyle}>
            {selectedEndDate ? selectedEndDate.toString() : ""}
          </Text>
        </View> */}
      </View>
      <View>
        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AdminAddBookingsDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.adminBackground,
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  button: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
