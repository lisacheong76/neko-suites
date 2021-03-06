import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { firestore } from "../../../firebase";

const BookingHistoryDetails = ({ navigation, route }) => {
  const [bookingData, setBookingData] = useState("");
  const [imageData, setImageData] = useState("");
  const [userData, setUserData] = useState("");

  const handleDelete = async () => {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to cancel your booking? :3",
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
              .delete()
              .then(() => {
                navigation.replace("Homepage");
                console.log("Doc deleted");
                Alert.alert(
                  "Booking Cancelled!",
                  "Your booking has been cancelled successfully :3"
                );
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
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

      const imageRef = firestore.collection("rooms").doc(doc.data().roomID);
      const docImage = await imageRef.get();
      if (!docImage.exists) {
        console.log("No such document!");
      } else {
        setImageData(docImage.data());
      }
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
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={style.headerImage}
        source={{ uri: imageData.roomImage }}
      >
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={style.header2}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {route.params.paramkey}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></View>
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Room</Text>
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
              {bookingData.roomName ? bookingData.roomName : "Room Unavailable"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Start Date</Text>
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
              {bookingData.start ? bookingData.start : "Start Date Unavailable"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>End Date</Text>
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
              {bookingData.end ? bookingData.end : "End Date Unavailable"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Pickup / Return
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
              {bookingData.pickup ? bookingData.pickup : "No Request"}
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
        ></View>
        <View style={style.button}>
          <Text
            style={style.buttonText}
            onPress={() =>
              navigation.replace("Pickup", {
                paramkey: route.params.paramkey,
              })
            }
          >
            Pickup / Return Service
          </Text>
        </View>
        <View style={style.button2}>
          <Text style={style.buttonText2} onPress={handleDelete}>
            Cancel Booking
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
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
    marginTop: "3%",
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
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
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
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

export default BookingHistoryDetails;
