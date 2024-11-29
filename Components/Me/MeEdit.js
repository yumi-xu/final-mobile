import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { Button, Card, Dialog, Input, Text } from "@rneui/themed";
import { validateUserInfo } from "./validateUserInfo";
import { GenderInput } from "./GenderInput";
import { useLoginUserId } from "../UserContext";
import { updateDB } from "../../Firebase/firestoreHelper";
import { AvatarEdit } from "./AvatarEdit";
import { uploadImage } from "../ImageManager";
import { commonStyles } from "../../Styles";

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
      ],
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
      // check if Avatar Changed
      if (avatar !== initialUserInfo.userAvatar) {
        console.log("before upload");
        const path = await uploadImage(avatar);
        console.log("uploaded");
        userInfo.avatar = path;
      }
      console.log(userInfo);
      //update me info
      await updateDB(userId, userInfo, "users");
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Me");
    } catch (error) {
      //loading
      setLoading(false);
      console.log(error);
      Alert.alert("Failed", "Error updating profile!");
    }
  };

  return (
    <>
      <ScrollView>
        <Card>
          <Text style={commonStyles.label}>Avatar</Text>
          <AvatarEdit avatar={avatar} onChange={setAvatar} />

          <Text style={commonStyles.label}>Name *</Text>
          <Input value={name} onChangeText={setName} />

          <Text style={commonStyles.label}>Age *</Text>
          <Input value={age} onChangeText={setAge} />

          <Text style={commonStyles.label}>Sex *</Text>
          <GenderInput value={sex} onChange={setSex} />

          <Text style={commonStyles.label}>Email *</Text>
          <Input value={email} onChangeText={setEmail} />

          <Text style={commonStyles.label}>Phone *</Text>
          <Input value={phone} onChangeText={setPhone} />

          <Text style={commonStyles.label}>Address *</Text>
          <Input value={address} onChangeText={setAddress} />

          <Text style={commonStyles.label}>Description *</Text>
          <Input value={description} onChangeText={setDescription} />
          <View style={commonStyles.buttons}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              buttonStyle={commonStyles.button}
            />
            <Button
              title="Submit"
              onPress={handleUpdateProfile}
              buttonStyle={commonStyles.button}
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
