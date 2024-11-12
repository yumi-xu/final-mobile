import { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Avatar, Icon } from "@rneui/themed";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";

export default function PostItem({ item: post }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Toggle favorite status and update count
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    setFavoriteCount((prevCount) => prevCount + (isFavorited ? -1 : 1));
  };
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        {post.userAvatar && (
          <Avatar rounded source={{ uri: post.userAvatar }} />
        )}
        <Text style={styles.userName}>{post.userName}</Text>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={styles.favoriteContainer}
        >
          <Icon
            name={isFavorited ? "heart" : "heart-outline"}
            type="ionicon"
            size={24}
            color={isFavorited ? "red" : "black"}
          />
          <Text style={styles.favoriteCount}>{favoriteCount}</Text>
        </TouchableOpacity>
        <Icon name="chatbubble-outline" type="ionicon" size={24} />
      </View>
      <Text style={styles.description}>{post.description}</Text>
    </Card>
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
  postImage: {
    width: "100%",
    height: 300,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  description: {
    padding: 10,
  },
});
