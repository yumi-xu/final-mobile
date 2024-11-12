import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "@rneui/themed";

export const AvatarEdit = ({ avatar, onChange }) => {
  const pickImage = async () => {
    // Request permission to access the media library
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the media library is required!");
      return;
    }

    // Pick an image from the library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <Avatar
      rounded
      source={avatar ? { uri: avatar } : null}
      onPress={pickImage}
    />
  );
};
