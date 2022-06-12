import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import COLORS from "../../consts/colors";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  auth,
  firestore,
  getStorage,
  ref,
  getDownloadURL,
} from "../../../firebase";

const Checkout = ({ navigation, route }) => {
  const [myCartList, setMyCartList] = useState("");
  const [bookingData, setBookingData] = useState([]);

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

  function renderCartList() {
    return (
      <SwipeListView
        data={bookingData}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          marginTop: 10,
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(item, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: COLORS.white,
              ...styles.cartItemContainer,
            }}
          >
            <View
              style={{
                width: 90,
                height: 100,
                marginLeft: -10,
              }}
            >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 10,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text>{item.roomName}</Text>
              <Text>RM{item.price}</Text>
            </View>
          </View>
        )}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {renderCartList()}

      {/* <Text>Checkout Screen</Text>
      <Text>{route.params?.title}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
export default Checkout;
