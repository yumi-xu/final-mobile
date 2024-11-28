import React, { useState } from "react";
import { Text, TextInput, Alert, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "../Firebase/firebaseSetup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authStyles } from "../Styles";
import { isEmailValid } from "./helper";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    //check login info
    if (email.length === 0 || password.length === 0) {
      Alert.alert("All fields should be provided!");
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert("Error", "Email address is invalid!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={authStyles.container}>
      <Text style={authStyles.header}>Welcome Back to WanderConnect!</Text>
      <Text style={authStyles.description}>
        Rejoin a global community of travel lovers. Log in and pick up where you
        left off on your journey of discovery and connection.
      </Text>
      <Text style={authStyles.label}>Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={authStyles.input}
      />

      <Text style={authStyles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={authStyles.input}
      />

      <Button
        title="Log In"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={handleLogin}
      />

      <Button
        title="Forgot Password?"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={() => navigation.navigate("ResetPassword")}
      />

      <Button
        title="New User? Create an account"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={() => navigation.navigate("Signup")}
      />
    </ScrollView>
  );
}
