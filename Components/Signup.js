import React, { useState } from "react";
import { Text, TextInput, Alert, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { writeToDBWithId } from "../Firebase/firestoreHelper";
import { DEFAULT_AVATAR, isEmailValid, isPasswordStrong } from "./helper";
import { authStyles } from "../Styles";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      Alert.alert("Error", "All fields must be filled out.");
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert("Error", "Email address is invalid!");
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
    <ScrollView contentContainerStyle={authStyles.container}>
      <Text style={authStyles.header}>Welcome to WanderConnect!</Text>
      <Text style={authStyles.description}>
        Discover the world, share your journeys, and connect with fellow
        travelers on WanderConnect, your ultimate social travel companion. Join
        a community of travel enthusiasts and make your next adventure
        unforgettable.
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

      <Text style={authStyles.label}>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry
        style={authStyles.input}
      />

      <Button
        title="Register"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={handleSignup}
      />

      <Button
        title="Forgot Password?"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={() => navigation.navigate("ResetPassword")}
      />

      <Button
        title="Already Registered? Login"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={() => navigation.navigate("Login")}
      />
    </ScrollView>
  );
}
