import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
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
  const [isEditing, setIsEditing] = useState(false);

  const auth = getAuth();
  // const userId = auth.currentUser?.uid;

  //TODO: add auth in iteration 2
  const userId = "123";

  useEffect(() => {
    if (!userId) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(database, "users", userId),
      (docSnap) => {
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
      },
    );
    // Cleanup function to detach the listener
    return () => {
      unsubscribe();
    };
  }, []);

  const editProfile = () => {
    navigation.navigate("MeEdit");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={userInfo.name} />

      <Button title="Edit Profile" onPress={editProfile} />
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
