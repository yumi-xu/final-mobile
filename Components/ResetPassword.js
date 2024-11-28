import React, { useState } from "react";
import { Text, TextInput, Alert, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "../Firebase/firebaseSetup";
import { sendPasswordResetEmail } from "firebase/auth";
import { authStyles } from "../Styles";

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={authStyles.container}>
      <Text style={authStyles.header}>Reset Password</Text>
      <Text style={authStyles.description}>
        Enter your email address below and we'll send you a link to reset your
        password.
      </Text>
      <Text style={authStyles.label}>Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={authStyles.input}
      />
      <Button
        title="Send Reset Email"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={handlePasswordReset}
      />
      <Button
        title="Back to Login"
        buttonStyle={authStyles.button}
        titleStyle={authStyles.buttonText}
        onPress={() => navigation.navigate("Login")}
      />
    </ScrollView>
  );
}
