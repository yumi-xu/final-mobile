import { useEffect } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationManager = () => {
  // Request permissions when the component mounts
  useEffect(() => {
    requestPermissions();
  }, []);

  // Request notification permissions
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Cannot schedule notifications without permission."
      );
      return false;
    }
    return true;
  };

  // Verify and request permissions as needed
  const verifyPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant notification permissions to set reminders."
        );
        return false;
      }
    }
    return true;
  };

  // Schedule a notification
  const scheduleNotification = async (title, body, triggerSeconds) => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: title || "Reminder",
          body: body || "This is your scheduled reminder!",
          sound: true, // Play a sound when the notification arrives
        },
        trigger: {
          seconds: triggerSeconds || 10, // Default: 10 seconds delay
        },
      });
      console.log('event notification scheduled')
    } catch (err) {
      console.error("Error scheduling notification:", err);
      Alert.alert("Error", "Failed to schedule the notification.");
    }
  };

  return {
    scheduleNotification, // Export function for external use
  };
};

export default NotificationManager;
