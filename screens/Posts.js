import React from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { Card, Avatar, Icon } from "@rneui/themed";

const posts = [
  {
    id: 1,
    userName: "john_doe",
    userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    image: "https://placekitten.com/600/400",
    description: "A beautiful day with this lovely kitten!",
  },
  {
    id: 2,
    userName: "jane_smith",
    userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    image: "https://placekitten.com/600/401",
    description: "Chilling with my furry friend 🐾",
  },
];

export default function Posts() {
  return (
    <ScrollView>
      {posts.map((post) => (
        <Card key={post.id} containerStyle={styles.card}>
          <View style={styles.header}>
            <Avatar rounded source={{ uri: post.userAvatar }} />
            <Text style={styles.userName}>{post.userName}</Text>
          </View>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <View style={styles.actions}>
            <Icon name="heart-outline" type="ionicon" size={24} />
            <Icon name="chatbubble-outline" type="ionicon" size={24} />
            <Icon name="share-social-outline" type="ionicon" size={24} />
          </View>
          <Text style={styles.description}>{post.description}</Text>
        </Card>
      ))}
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
