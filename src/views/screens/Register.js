import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { auth, firestore, updateProfile } from '../../../firebase';
import firebaseErrors from '../../../firebaseErrors';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Homepage');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (password == password2) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);

          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: '/pawprint.jfif',
          });

          firestore.collection('users').doc(user.uid).set({
            role: 'Customer',
            name: '',
            phone: '',
            gender: '',
          });
        })
        .catch((error) => alert(firebaseErrors[error.code] || error.message));
    } else {
      alert('The passwords are different :<');
    }
  };

  const handleBack = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container} behavior="padding">
      <Image
        source={require('../../assets/nekosuites2.png')}
        resizeMode="center"
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>Create new account</Text>
        <View style={{ marginTop: 10 }} />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity */}
        <Text style={[styles.textBody, { paddingTop: 20 }, { fontSize: 13 }]}>
          Already have an account?
        </Text>
        <Text
          style={[styles.textBody, { color: '#e8a468' }, { fontSize: 13 }]}
          onPress={handleBack}
        >
          Click here
        </Text>
        {/* style={[styles.button, styles.buttonOutline]} */}
        {/* <Text style={styles.buttonOutlineText}>Back</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Register;

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
    fontSize: 25,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: 'sans-serif-medium',
    color: '#665444',
    fontSize: 15,
  },
});
