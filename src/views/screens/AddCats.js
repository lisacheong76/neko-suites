import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    View,
  } from 'react-native';
  import { useNavigation } from "@react-navigation/core";
  import {
    Avatar,
    Title,
    Caption,
    Text,
    TextInput,
    TouchableRipple,
  } from 'react-native-paper';
  import COLORS from '../../consts/colors';
  import Icon2 from 'react-native-vector-icons/MaterialIcons';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import Icon3 from 'react-native-vector-icons/FontAwesome5';

  const AddCats = () => {
    const navigation = useNavigation();
    return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 20 }}
    >
      <View style={styles.header}>
        <Icon2
          name="arrow-back-ios"
          size={28}
          color={"#665444"}
          onPress={navigation.goBack}
        />
      </View>
      <View>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar.Image
              source={require("../../assets/milo.jpeg")}
              size={90}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 5,
                color: "#665444",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Cat's Picture
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="cat" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Cat Name"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="clock" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Age = _ year/months old"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="human-male-female" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Gender"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="plus" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Allergy"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Save Cat</Text>
      </View>
    </SafeAreaView>
  );
};
    
export default AddCats;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 35,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 13,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
    header: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      justifyContent: 'space-between',
    },
    textBox: {
      height: 40,
      alignItems: 'center',
      paddingLeft: 20,
      flex: 1,
      backgroundColor: COLORS.secondary,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      flexDirection: 'row',
    },
    editTextBox: {
      height: 40,
      alignItems: 'center',
      paddingLeft: 10,
      flex: 1,
      backgroundColor: COLORS.secondary,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      flexDirection: 'row',
      fontSize: 15,
    },
    button: {
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 130,
      backgroundColor: COLORS.primary,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  });