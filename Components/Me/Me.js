import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Avatar, Card } from "@rneui/themed";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useMyUserInfo } from "./useMyUserInfo";
import { MyEvents } from "./MyEvents";

export default function Me() {
  const navigation = useNavigation();
  const userInfo = useMyUserInfo();

  const avatar = userInfo.avatarUri;
  const userName = userInfo.name;

  //go to edit page
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
          <TouchableOpacity onPress={handleEditProfile}>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Card>

      <MyEvents/>
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
