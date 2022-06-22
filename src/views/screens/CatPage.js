import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import COLORS from "../../consts/colors";
import { firestore, auth } from "../../../firebase";

const CatPage = () => {
  const navigation = useNavigation();
  const [cats, setCats] = useState([]);
  const [numCols, setColumnNo] = useState(2);

  const catRef = firestore
    .collection("cats")
    .where("owner", "==", auth.currentUser.uid);

  useEffect(async () => {
    catRef.onSnapshot((querySnapshot) => {
      const catArray = [];
      querySnapshot.forEach((doc) => {
        const {
          id,
          allergy,
          birthdate,
          gender,
          name,
          neutered,
          owner,
          vaccinated,
          image,
        } = doc.data();
        catArray.push({
          id: doc.id,
          allergy,
          birthdate,
          gender,
          name,
          neutered,
          owner,
          vaccinated,
          image,
        });
      });
      setCats(catArray);
    });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 20 }}
    >
      <View style={styles.container}>
        <FlatList
          data={cats}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          key={numCols}
          numColumns={numCols}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.replace("CatDetails", { paramkey: item.id })
              }
            >
              <Animated.View style={styles.CatsCard}>
                <Image
                  style={styles.CatsCardImage}
                  source={{ uri: item.image }}
                />
                <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      color: COLORS.grey,
                    }}
                  >
                    {item.birthdate}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default CatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 13,
  },
  button: {
    backgroundColor: "#e8a468",
    width: 150,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  CatsCard: {
    height: 160,
    width: Dimensions.get("window").width / 2.4,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 13,
    borderRadius: 10,
    marginTop: 15,
  },
  CatsCardImage: {
    height: 105,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
