import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";
import {
  Share,
  View,
  SafeAreaView,
  StyleSheet,
  Picker,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={5000}
    />
  );
}

const UserFeedback = () => {
  const [rating, setRating] = useState(0);

  const onSubmit = () => {
    // Actions on submit button click.
    console.log("Form submitted"); 
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
        rating={rating}
        onChange={setRating}
        style={{ alignSelf: "center", marginTop: 30 }}
      />
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <UselessTextInput
              style={styles.editTextBox}
              placeholder="Hoping for a kind feedback :>"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              multiline
              numberOfLines={4}
              borderBottomColor={COLORS.secondary}
              underlineColor={"transparent"}
              // value={displayName || ""}
              // onChangeText={(text) => setDisplayName(text)}
            ></UselessTextInput>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={onSubmit}>
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
    height: 150,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    borderBottomColor: COLORS.secondary,
  },
  editTextBox: {
    height: 150,
    paddingLeft: 10,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    fontSize: 15,
    borderBottomColor: COLORS.secondary,
    overflow: "scroll"
  },
  button: {
    marginTop: 120,
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
// import React from 'react';
// import {
//   StyleSheet,
//   View
// } from 'react-native';
// import DynamicForm from '@coffeebeanslabs/react-native-form-builder';

// const UserFeedback = ({ props, navigation, route }) => {
//   const formTemplate = {
//     data: [
//       {
//         component: 'image',
//         field_name: 'headerImage',
//         meta: {
//           label: 'alt text for header image',
//           source: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
//         },
//         style: {
//           width: 200,
//           height: 200
//         }
//       },
//       {
//         component: 'input-text',
//         field_name: 'name',
//         is_mandatory: 'true',
//         meta: {
//           label: 'Name',
//           placeholder: 'Enter name..'
//         }
//       },
//       {
//         component: 'input-date',
//         field_name: 'birthDate',
//         is_mandatory: 'true',
//         meta: {
//           title: 'Birth Date'
//         }
//       },
//       {
//         component: 'input-radio',
//         field_name: 'gender',
//         is_mandatory: 'true',
//         meta: {
//           text: 'Your Gender',
//           data: [
//             {
//               label: 'Male',
//               value: 'male'
//             },
//             {
//               label: 'Female',
//               value: 'female'
//             }
//           ]
//         }
//       }
//     ]
//   }

//   const onSubmit = formFields => {
//     // Actions on submit button click.
//     console.log('Form submitted with fields: ', formFields);
//   }

//   return (
//     <View style={styles.container}>
//       <DynamicForm formTemplate={formTemplate} onSubmit={onSubmit} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default UserFeedback;