import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Alert } from "react-native";
import { storage } from "../Firebase/firebaseSetup";

export async function verifyPermission() {
  const { granted } = await ImagePicker.getCameraPermissionsAsync();
  if (granted) return true;

  const { granted: requestGranted } =
    await ImagePicker.requestCameraPermissionsAsync();
  return requestGranted;
}

export async function takeImage() {
  try {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission Required",
        "You need to grant camera permissions to use this feature.",
      );
      return null;
    }

    // Ask the user to choose an action
    const userChoice = await new Promise((resolve) => {
      Alert.alert(
        "Select Image",
        "Choose how you want to select the image:",
        [
          { text: "Take a Photo", onPress: () => resolve("camera") },
          { text: "Choose from Albums", onPress: () => resolve("album") },
          // { text: "Cancel", style: "cancel", onPress: () => resolve(null) },
        ],
        { cancelable: true },
      );
    });

    if (userChoice === "camera") {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5, // Adjust image quality if needed
      });

      if (!result.canceled) {
        return result.assets[0].uri; // Return the image URI
      }
    } else if (userChoice === "album") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5, // Adjust image quality if needed
      });

      if (!result.canceled) {
        return result.assets[0].uri; // Return the image URI
      }
    }

    return null;
  } catch (error) {
    console.error("Error taking image:", error);
    return null;
  }
}

export async function uploadImage(uri) {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw Error(`An error happened`, response.status);
    }
    const blob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, blob);
    return uploadResult.metadata.fullPath;
  } catch (err) {
    console.error("Error Upload image:", err);
  }
}

export async function downloadImage(uri) {
  try {
    if (!uri) {
      return null;
    }
    if (!uri.startsWith("images/")) {
      return uri;
    }
    const reference = ref(storage, uri);
    const url = await getDownloadURL(reference);
    return url;
  } catch (error) {
    console.error("Error download image URL:", error);
  }
}
