import React, { useState, useEffect } from "react";
import StarRating from "react-native-star-rating-widget";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Text, TextInput } from "react-native-paper";
import COLORS from "../../consts/colors";
import { useNavigation } from "@react-navigation/core";
import { auth, firestore } from "../../../firebase";
import firebaseErrors from "../../../firebaseErrors";

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={100}
    />
  );
};

const UserFeedback = () => {
  const [ratingData, setRatingData] = useState(0);
  const [feedbackData, setFeedbackData] = useState("");
  const [userData, setUserData] = useState("");
  const navigation = useNavigation();

  const getUser = async () => {
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      setUserData(doc.data());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleAdd = async () => {
    firestore
      .collection("feedback")
      .add({
        message: feedbackData.message,
        rating: ratingData,
        by: auth.currentUser.uid,
        profile: userData.image,
      })
      .then(() => {
        console.log("Success");
        Alert.alert("Feedback Submitted!", "Purrrfect feedback :3");
      })
      .catch((error) => {
        alert(firebaseErrors[error.code] || error.message);
      });

    navigation.replace("Homepage");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Text
        style={{
          fontWeight: "bold",
          color: "#665444",
          fontSize: 25,
          textAlign: "center",
          marginTop: 70,
        }}
      >
        Kindly rate our service, {"\n"}
        Meow!
      </Text>
      <StarRating
        rating={ratingData}
        onChange={(number) => {
          setRatingData(number);
        }}
        style={{ alignSelf: "center", marginTop: 30 }}
        enableHalfStar={false}
        minRating={1}
        maxStars={5}
      />
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <UselessTextInput
              style={styles.editTextBox}
              placeholder="Hoping for a purrfect feedback :3"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              multiline
              numberOfLines={2}
              borderBottomColor={COLORS.secondary}
              underlineColor={"transparent"}
              value={feedbackData ? feedbackData.message : ""}
              onChangeText={(text) =>
                setFeedbackData({ ...feedbackData, message: text })
              }
            ></UselessTextInput>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={handleAdd}>
          Submit
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UserFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  userInfoSection: {
    marginTop: 20,
    paddingHorizontal: 30,
    marginBottom: 35,
  },
  row: {
    flexDirection: "row",
    marginBottom: 13,
  },
  textBox: {
    height: 170,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: COLORS.secondary,
  },
  editTextBox: {
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 16,
    borderBottomColor: COLORS.secondary,
    overflow: "scroll",
  },
  button: {
    marginTop: 100,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
