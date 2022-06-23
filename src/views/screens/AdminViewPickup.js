import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import COLORS from "../../consts/colors";
import hotels from "../../consts/roomType";
import { firestore } from "../../../firebase";

const AdminViewPickup = ({ navigation, route }) => {
  const [bookingData, setBookingData] = useState("");
  const [imageData, setImageData] = useState("");
  const [userData, setUserData] = useState("");

  const handleCancel = async () => {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to cancel your request? :3",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            firestore
              .collection("booking")
              .doc(route.params.paramkey)
              .update({
                pickup: "",
                address: "",
              })
              .then(() => {
                navigation.navigate("AdminPickup", {
                  paramkey: route.params.paramkey,
                });
                console.log("Success");
                Alert.alert(
                  "Service Request Cancellation Successful!",
                  "Your request has been successfully cancelled :3"
                );
              })
              .catch((error) => {
                alert(firebaseErrors[error.code] || error.message);
              });
          },
        },
      ]
    );
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
      const found = hotels.find((obj) => {
        return obj.id === doc.data().roomID;
      });
      setImageData(found);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.adminBackground,
        paddingBottom: 20,
        flex: 1,
      }}
    >
      <View>
        <View style={style.header2}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: COLORS.grey }}
          >
            Booking ID
          </Text>
        </View>

        <Text style={{ fontSize: 26, fontWeight: "bold", paddingLeft: 20 }}>
          {route.params.paramkey}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        ></View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Number of Cats
          </Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {bookingData.pax ? bookingData.pax : "Pax Unavailable"}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cats</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
                textAlign: "right",
              }}
            >
              {bookingData.cats ? bookingData.cats : "Cats Unavailable"}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pickup Date</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
                textAlign: "right",
              }}
            >
              {bookingData.start ? bookingData.start : "Date Unavailable"}
              {"\n"}
              {bookingData.end ? bookingData.end : "Date Unavailable"}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Address</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {bookingData.address
                ? bookingData.address
                : "End Date Unavailable"}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Booked By</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {userData.name ? userData.name : userData.username}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Requested</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4b5142",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {bookingData.pickup ? bookingData.pickup : bookingData.pickup}
            </Text>
          </View>
        </View>
        <View style={style.button}>
          <Text style={style.buttonText} onPress={handleCancel}>
            Cancel Pickup
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  header2: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
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

export default AdminViewPickup;
