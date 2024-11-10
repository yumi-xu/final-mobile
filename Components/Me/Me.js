import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Icon } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { MyPosts } from "./MyPosts";
import { MyEvents } from "./MyEvents";

export default function Me() {
  const navigation = useNavigation();
  const userInfo = useMyUserInfo();

  // TODO: DEFAULT AVATAR
  const avatar =
    userInfo.avatar || "https://randomuser.me/api/portraits/men/1.jpg";
  const userName = userInfo.name;

  const handleEditProfile = () => {
    navigation.navigate("MeEdit");
  };

  return (
    <ScrollView>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <Avatar rounded source={{ uri: avatar }} />
          <Text style={styles.userName}>{userName}</Text>
          <Button onPress={handleEditProfile}>Edit Profile</Button>
        </View>
      </Card>

      <MyPosts />
      <MyEvents />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  description: {
    padding: 10,
  },
});
