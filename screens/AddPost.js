import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useMyUserInfo } from "../Components/Me/useMyUserInfo";
import { writeToDB } from "../Firebase/firestoreHelper";
import { takeImage, uploadImage } from "../Components/ImageManager";
import { addPost } from "../Styles";

export default function AddPost({ navigation }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const userInfo = useMyUserInfo();

  const pickImage = async () => {
    const uri = await takeImage();
    setImage(uri);
  };

  const handlePost = async () => {
    if (description && image) {
      const path = await uploadImage(image);
      const newPost = {
        imageUrl: path,
        description,
        userId: userInfo.id,
        userName: userInfo.name,
        userAvatar: userInfo.avatar,
      };
      writeToDB(newPost, "Posts");
      alert("Post submitted!");
      setDescription("");
      setImage(null);
      navigation.goBack();
    } else {
      alert("Please select an image and enter a description.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Icon name="camera" type="ionicon" size={48} />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Write a description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title="Post"
        onPress={handlePost}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: addPost.container,
  imagePicker: addPost.imagePicker,
  previewImage: addPost.previewImage,
  input: addPost.input,
  buttonContainer: addPost.buttonContainer,
});
