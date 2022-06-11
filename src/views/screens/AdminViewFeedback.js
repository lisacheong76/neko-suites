import React from "react";
import { View, Text } from "react-native";

const AdminViewFeedback = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>View Feedback Screen</Text>
      <Text>{route.params?.title}</Text>
    </View>
  );
};

export default AdminViewFeedback;
