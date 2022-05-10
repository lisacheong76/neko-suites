// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAA8MFaOnFdZDMteCZjJRnzbucPLWHpt1M',
  authDomain: 'neko-suites.firebaseapp.com',
  projectId: 'neko-suites',
  storageBucket: 'neko-suites.appspot.com',
  messagingSenderId: '682947082082',
  appId: '1:682947082082:web:d6eade046842551d53de3b',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
  getStorage,
  ref,
  getDownloadURL,
};
