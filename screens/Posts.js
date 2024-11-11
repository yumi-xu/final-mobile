import { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { Card, Avatar, Icon } from "@rneui/themed";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Subscribe to Posts collection
    const unsubscribePosts = onSnapshot(
      collection(database, "Posts"),
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id, // Adding document ID
        }));
        setPosts(updatedItems);
      }
    );
    return () => unsubscribePosts();
  }, []);

  return (
    <ScrollView>
      {posts.map((post) => (
        <Card key={post.id} containerStyle={styles.card}>
          <View style={styles.header}>
            {post.userAvatar && (
              <Avatar rounded source={{ uri: post.userAvatar }} />
            )}
            <Text style={styles.userName}>{post.userName}</Text>
          </View>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <View style={styles.actions}>
            <Icon name="heart-outline" type="ionicon" size={24} />
            <Icon name="chatbubble-outline" type="ionicon" size={24} />
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
