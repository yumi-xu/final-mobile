import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { MyPosts } from "./MyPosts";

export default function Me() {
  const navigation = useNavigation();
  const userInfo = useMyUserInfo();

  const avatar = userInfo.avatar;
  const userName = userInfo.name;

  const handleEditProfile = () => {
    navigation.navigate("MeEdit");
  };

  return (
    <ScrollView>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Avatar
              rounded
              containerStyle={styles.avatar}
              source={avatar ? { uri: avatar } : null}
            />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <Button onPress={handleEditProfile}>Edit Profile</Button>
        </View>
      </Card>

      <MyPosts />
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
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  description: {
    padding: 10,
  },
  avatar: {
    width: 25,
    height: 25,
  },
});
