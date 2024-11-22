import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { Button, Card, Dialog } from "@rneui/themed";
import { validateUserInfo } from "./validateUserInfo";
import { GenderInput } from "./GenderInput";
import { useLoginUserId } from "../UserContext";
import { updateDB } from "../../Firebase/firestoreHelper";
import { AvatarEdit } from "./AvatarEdit";
import { uploadImage } from "../ImageManager";

export default function MeEdit() {
  const navigation = useNavigation();
  const initialUserInfo = useMyUserInfo();

  const [name, setName] = useState(initialUserInfo.name);
  const [age, setAge] = useState(initialUserInfo.age);
  const [sex, setSex] = useState(initialUserInfo.sex);
  const [avatar, setAvatar] = useState(initialUserInfo.avatarUri);
  const [email, setEmail] = useState(initialUserInfo.email);
  const [phone, setPhone] = useState(initialUserInfo.phone);
  const [address, setAddress] = useState(initialUserInfo.address);
  const [description, setDescription] = useState(initialUserInfo.description);

  const [loading, setLoading] = useState(false);

  const userId = useLoginUserId();

  useEffect(() => {
    setName(initialUserInfo.name);
    setAge(initialUserInfo.age);
    setSex(initialUserInfo.sex);
    setAvatar(initialUserInfo.avatarUri);
    setEmail(initialUserInfo.email);
    setPhone(initialUserInfo.phone);
    setAddress(initialUserInfo.address);
    setDescription(initialUserInfo.description);
  }, [initialUserInfo]);

  const handleCancel = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to discard the changes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleUpdateProfile = async () => {
    const userInfo = {
      name,
      age,
      sex,
      avatar,
      email,
      phone,
      address,
      description,
    };

    const errors = validateUserInfo(userInfo);
    if (errors.length) {
      const message = [
        "There are following errors in the field, please correct:\n",
        ...errors,
      ].join("\n");
      Alert.alert("Error", message);
      return;
    }
    setLoading(true);
    try {
      if (avatar !== initialUserInfo.userAvatar) {
        const path = await uploadImage(avatar);
        userInfo.avatar = path;
      }
      //update me info
      await updateDB(userId, userInfo, "users");
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Me");
    } catch (error) {
      //loading
      setLoading(false);
      Alert.alert("Failed", "Error updating profile!");
    }
  };

  return (
    <>
      <ScrollView>
        <Card>
          <Text style={styles.label}>Avatar</Text>
          <AvatarEdit avatar={avatar} onChange={setAvatar} />

          <Text style={styles.label}>Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />

          <Text style={styles.label}>Age</Text>
          <TextInput value={age} onChangeText={setAge} style={styles.input} />

          <Text style={styles.label}>Sex</Text>
          <GenderInput value={sex} onChange={setSex} />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              buttonStyle={styles.button}
            />
            <Button
              title="Submit"
              onPress={handleUpdateProfile}
              buttonStyle={styles.button}
            />
          </View>
        </Card>
      </ScrollView>
      <Dialog visible={loading}>
        <Text>Loading</Text>
      </Dialog>
    </>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flex: 1, // make the button take up equal space
    marginHorizontal: 5, // add some spacing between buttons
  },
});
