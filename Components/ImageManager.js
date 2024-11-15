import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

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
        "You need to grant camera permissions to use this feature."
      );
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5, // Adjust image quality if needed
    });

    if (!result.canceled) {
      return result.assets[0].uri; // Return the image URI
    }
    return null;
  } catch (error) {
    console.error("Error taking image:", error);
    return null;
  }
}
