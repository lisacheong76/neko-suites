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

const CatDetails = ({ navigation, route }) => {
  const [catData, setCatData] = useState("");

  const handleDelete = async () => {
    firestore
      .collection("cats")
      .doc(route.params.paramkey)
      .delete()
      .then(() => {
        console.log("Doc deleted");
        Alert.alert(
          "Cat Details Deleted!",
          "Your cat details has been deleted successfully :3"
        );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    navigation.replace("CatPage");
  };

  const getCat = async () => {
    const userRef = firestore.collection("cats").doc(route.params.paramkey);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setCatData(doc.data());
    }
  };

  useEffect(() => {
    getCat();
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
        source={{ uri: catData.image }}
      >
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={() => navigation.replace("Homepage")}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon
            name="edit"
            color={COLORS.white}
            size={28}
            onPress={() =>
              navigation.replace("EditCatDetails", {
                paramkey: route.params.paramkey,
              })
            }
          />
        </View>
        <View style={style.header2}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {catData.name}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Gender</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.gender ? catData.gender : "Gender not set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Birth Date</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.birthdate ? catData.birthdate : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Allergy</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.allergy ? catData.allergy : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Vaccinated</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.vaccinated ? catData.vaccinated : "Not Set"}
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
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            Neutered / Spayed
          </Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#665444",
                marginLeft: 5,
                marginRight: 15,
              }}
            >
              {catData.neutered ? catData.neutered : "Not Set"}
            </Text>
          </View>
        </View>
        <View style={style.button}>
          <Text style={style.buttonText} onPress={handleDelete}>
            Delete Cat
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -20,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginTop: "10%",
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default CatDetails;
