import React from "react";
import { Avatar } from "@rneui/themed";
import { takeImage } from "../ImageManager";

export const AvatarEdit = ({ avatar, onChange }) => {
  const pickImage = async () => {
    const uri = await takeImage();
    if (uri) {
      onChange(uri);
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
