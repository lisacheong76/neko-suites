// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCp86tG33Ag17Nw6hUXn2PkGkqE8aqSVj4',
  authDomain: 'neko-9b891.firebaseapp.com',
  projectId: 'neko-9b891',
  storageBucket: 'neko-9b891.appspot.com',
  messagingSenderId: '274260486608',
  appId: '1:274260486608:web:4d3830ae4a8d0c0b48b1d5',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
