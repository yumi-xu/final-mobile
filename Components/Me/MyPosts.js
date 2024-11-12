import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { useMyPosts } from "./useMyPosts";
import { MyPostsItem } from "./MyPostsItem";

export const MyPosts = () => {
  const myPosts = useMyPosts();
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>My Posts</Card.Title>
      {myPosts.map((post) => {
        return <MyPostsItem key={post.id} post={post} />;
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
});
