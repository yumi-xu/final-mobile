import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup"; // Adjust this path as needed

export default function MeEdit({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    sex: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const auth = getAuth();
  // const userId = auth.currentUser?.uid;

  const userId = "123";

  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const fetchUserInfo = async () => {
    try {
      const docRef = doc(database, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("read data is", data);
        setUserInfo({
          name: data.name || "",
          age: data.age || "",
          sex: data.sex || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          description: data.description || "",
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      console.log("UserInfo before update:", userInfo);
      const docRef = doc(database, "users", userId);
      await updateDoc(docRef, userInfo);
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Me");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={userInfo.name}
        onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        value={userInfo.age}
        onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Sex</Text>
      <TextInput
        value={userInfo.sex}
        onChangeText={(text) => setUserInfo({ ...userInfo, sex: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={userInfo.phone}
        onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        value={userInfo.address}
        onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={userInfo.description}
        onChangeText={(text) => setUserInfo({ ...userInfo, description: text })}
        style={styles.input}
      />

      <Button title="Submit" onPress={handleUpdateProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
