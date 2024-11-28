import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { meStyles } from "../../Styles";

export const Header = () => {
  const navigation = useNavigation();
  const userInfo = useMyUserInfo();

  const avatar = userInfo.avatarUri;
  const userName = userInfo.name;

  //go to edit page
  const handleEditProfile = () => {
    navigation.navigate("MeEdit");
  };

  return (
    <Card containerStyle={meStyles.section}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Avatar
            rounded
            containerStyle={styles.avatar}
            source={avatar ? { uri: avatar } : null}
          />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity onPress={handleEditProfile}>
          <Icon name="edit" type="material" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
