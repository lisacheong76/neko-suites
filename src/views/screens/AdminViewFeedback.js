import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../consts/colors";
// import { PrimaryButton } from "../../consts/button";
import { firestore } from "../../../firebase";

const AdminViewFeedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState([]);
  const [numCols, setColumnNo] = useState(2);

  const feedbackRef = firestore.collection("feedback");

  useEffect(async () => {
    feedbackRef.onSnapshot((querySnapshot) => {
      const feedbackArray = [];
      querySnapshot.forEach((doc) => {
        const { message, rating } = doc.data();
        feedbackArray.push({
          id: doc.id,
          message,
          rating,
        });
      });
      setFeedback(feedbackArray);
    });
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <View
          style={{
            height: 220,
            marginLeft: 10,
            paddingTop: 20,
            flex: 1,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            {item.rating}
            <Text> </Text>
            <Image
              style={{
                width: 22,
                height: 22,
              }}
              source={require("../../assets/star.png")}
            />
          </Text>
          <View style={{ paddingBottom: 5 }}></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 15, color: COLORS.adminFont }}>
              {item.message}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.adminBackground,
        flex: 1,
        paddingTop: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: COLORS.adminFont,
            marginLeft: 23,
            fontSize: 17,
            marginBottom: 5,
          }}
        >
          Feedback List
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          key={numCols}
          numColumns={numCols}
          contentContainerStyle={{ paddingBottom: 80, marginLeft: 15 }}
          data={feedback}
          renderItem={({ item }) => <CartCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: "100%",
    width: Dimensions.get("window").width / 2.4,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default AdminViewFeedback;
