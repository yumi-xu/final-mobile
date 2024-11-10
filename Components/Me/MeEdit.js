import React, { useState, useEffect } from "react";
import { Text, TextInput, Alert, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { useUpdateUserInfo } from "./useUpdateUserInfo";
import { Avatar, Button, Card } from "@rneui/themed";
import { validateUserInfo } from "./validateUserInfo";

export default function MeEdit() {
  const navigation = useNavigation();
  const initialUserInfo = useMyUserInfo();
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const updateUserInfo = useUpdateUserInfo();

  // TODO: DEFAULT AVATAR
  const avatar =
    userInfo.avatar || "https://randomuser.me/api/portraits/men/1.jpg";

  useEffect(() => {
    setUserInfo(initialUserInfo);
  }, [initialUserInfo]);

  const handleUpdateProfile = async () => {
    try {
      console.log("UserInfo before update:", userInfo);

      const errors = validateUserInfo(userInfo);
      if (errors.length) {
        const message = [
          "There are following errors in the field, please correct:\n",
          ...errors,
        ].join("\n");
        Alert.alert("Error", message);
        return;
      }

      await updateUserInfo(userInfo);
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Me");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Text style={styles.label}>Avatar</Text>
        <Avatar rounded source={{ uri: avatar }} />

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
          onChangeText={(text) =>
            setUserInfo({ ...userInfo, description: text })
          }
          style={styles.input}
        />

        <Button title="Submit" onPress={handleUpdateProfile} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
