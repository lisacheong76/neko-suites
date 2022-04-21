import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { auth, sendPasswordResetEmail } from '../../../firebase';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.replace('Login');
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent! Check your inbox');
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    // <ScrollView style = {{backgroundColor: 'white'}}>
    <View style={styles.container} behavior="padding">
      <Image
        source={require('../../assets/nekosuites2.png')}
        resizeMode="center"
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>Reset password</Text>
        <Text style={styles.textBody}>Enter your email</Text>
        <View style={{ marginTop: 20 }} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBack} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5ed',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#e8a468',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#e8a468',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#e8a468',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    width: 400,
    height: 150,
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'sans-serif-medium',
    color: '#665444',
    fontSize: 35,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: 'sans-serif-medium',
    color: '#665444',
    fontSize: 15,
  },
  textBody2: {
    fontFamily: 'sans-serif-medium',
    color: '#665444',
    fontSize: 13,
    marginTop: 5,
  },
});
