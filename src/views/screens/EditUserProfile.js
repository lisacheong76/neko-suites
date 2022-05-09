import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Share, View, SafeAreaView, StyleSheet } from 'react-native';
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
import {
  auth,
  firestore,
  getStorage,
  ref,
  getDownloadURL,
} from '../../../firebase';

// import Share from 'react-native-share';

// import files from "../../assets/filesBase64";

const EditUserProfile = () => {
  const navigation = useNavigation();

  const displayName = auth.currentUser.displayName;
  const email = auth.currentUser.email;
  const photo = auth.currentUser.photoURL;
  const phoneNumber = auth.currentUser.phoneNumber;

  const [userData, setUserData] = useState('');
  const [url, setUrl] = useState('');

  const getUser = async () => {
    const userRef = firestore.collection('users').doc(auth.currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setUserData(doc.data());
    }
  };

  const getPhoto = async () => {
    const storage = getStorage();
    const reference = ref(storage, photo);
    await getDownloadURL(reference).then((x) => {
      setUrl(x);
    });
  };

  useEffect(() => {
    getUser();
    getPhoto();
  }, []);

  // const myCustomShare = async() => {
  //   const shareOptions = {
  //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //     // url: files.appLogo,
  //     // urls: [files.image1, files.image2]
  //   }

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch(error) {
  //     console.log('Error => ', error);
  //   }
  // };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 20 }}
    >
      <View style={styles.header}>
        <Icon2
          name="arrow-back-ios"
          size={28}
          color={'#665444'}
          onPress={navigation.goBack}
        />
      </View>
      <View>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar.Image source={{ uri: url }} size={90} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 5,
                color: '#665444',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Profile Picture
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="account" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Username"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={displayName}
            ></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="account-heart" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Name"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={userData.name || ''}
            ></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.textBox}>
            <Icon name="phone" color="#665444" size={20} />
            <TextInput
              style={styles.editTextBox}
              placeholder="Phone Number"
              placeholderTextColor="#666666"
              placeholderTextSize="20"
              autoCorrect={false}
              value={phoneNumber || ''}
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
              value={userData.gender || ''}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Save Edit</Text>
      </View>
    </SafeAreaView>
  );
};

export default EditUserProfile;

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
    marginTop: 100,
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
