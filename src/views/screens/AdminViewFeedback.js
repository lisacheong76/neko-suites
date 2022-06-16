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
  ImageBackground,
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
        const { message, rating, profile } = doc.data();
        feedbackArray.push({
          message,
          rating,
          profile,
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
            marginLeft: 10,
            paddingTop: 20,
            alignSelf: "flex-start",
          }}
        >
          <Text>
            <ImageBackground
              source={{ uri: item.profile }}
              style={{ width: 28, height: 28 }}
              imageStyle={{ borderRadius: 25 }}
            />
            <Text style={{ fontSize: 11, color: COLORS.adminFont }}>
              {item.name}
            </Text>
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 25, paddingTop: 5 }}>
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
        paddingBottom: 40,
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
          key={numCols}
          numColumns={numCols}
          contentContainerStyle={{ marginLeft: 15 }}
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
    height: 250,
    width: Dimensions.get("window").width / 2.4,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 13,
    marginTop: 10,
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
