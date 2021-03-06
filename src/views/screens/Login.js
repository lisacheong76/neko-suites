import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth, firestore } from "../../../firebase";
import firebaseErrors from "../../../firebaseErrors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const getRole = async () => {
          const roleRef = firestore.collection("users").doc(user.uid);
          const doc = await roleRef.get();
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            const role = doc.data().role;
            return role;
          }
        };

        (async function () {
          let role = await getRole();

          if (role == "Admin") {
            navigation.replace("Dashboard", {
              paramKey: user.displayName,
            });
          } else {
            navigation.replace("Homepage");
          }
        })();
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    navigation.replace("Register");
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(firebaseErrors[error.code] || error.message));
  };

  const handleReset = () => {
    navigation.replace("ResetPassword");
  };

  return (
    <View style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/nekosuites2.png")}
        resizeMode="center"
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>Welcome back!</Text>
        <Text style={styles.textBody}>Log in to your account</Text>
        <View style={{ marginTop: 20 }} />
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
        <View style={{ width: "100%" }}>
          <Text
            style={[styles.textBody2, { alignSelf: "flex-end" }]}
            onPress={handleReset}
          >
            Forgot Password?
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.textBody, { paddingTop: 20 }, { fontSize: 13 }]}>
          Don't have an account?
        </Text>
        <Text
          style={[styles.textBody, { color: "#e8a468" }, { fontSize: 13 }]}
          onPress={handleSignUp}
        >
          Create one!
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5ed",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#e8a468",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#e8a468",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    width: 400,
    height: 150,
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: "sans-serif-medium",
    color: "#665444",
    fontSize: 35,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: "sans-serif-medium",
    color: "#665444",
    fontSize: 15,
  },
  textBody2: {
    fontFamily: "sans-serif-medium",
    color: "#665444",
    fontSize: 13,
    marginTop: 5,
  },
});
