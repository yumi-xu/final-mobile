import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { useMyUserInfo } from "../Components/Me/useMyUserInfo";
import { writeToDB } from "../Firebase/firestoreHelper";

export default function AddPost({ navigation }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const userInfo = useMyUserInfo();

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
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (description && image) {
      console.log(userInfo);
      const newPost = {
        image,
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  imagePicker: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
