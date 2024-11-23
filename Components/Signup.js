import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { writeToDBWithId } from "../Firebase/firestoreHelper";
import { DEFAULT_AVATAR } from "./helper";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSignup = async () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      Alert.alert("Error", "All fields must be filled out.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!isPasswordStrong(password)) {
      Alert.alert(
        "Weak Password",
        'Password must be at least 8 characters long, and include uppercase, lowercase, numbers, and special characters. Special characters should be in !@#$%^&*(),.?":{}|<>',
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await writeToDBWithId(
        user.uid,
        {
          name: user.email,
          age: "",
          sex: "",
          avatar: DEFAULT_AVATAR,
          email: user.email,
          phone: "",
          address: "",
          description: "",
        },
        "users",
      );
      Alert.alert("Success", "User registered successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to WanderConnect!</Text>
      <Text style={styles.description}>
        Discover the world, share your journeys, and connect with fellow
        travelers on WanderConnect, your ultimate social travel companion. Join
        a community of travel enthusiasts and make your next adventure
        unforgettable.
      </Text>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry
        style={styles.input}
      />

      <Button title="Register" onPress={handleSignup} />

      <Button
        title="Forgot Password?"
        onPress={() => navigation.navigate("ResetPassword")}
      />

      <Button
        title="Already Registered? Login"
        onPress={() => navigation.navigate("Login")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    width: "90%",
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#6200ee",
    marginTop: 10,
    fontSize: 16,
  },
});
