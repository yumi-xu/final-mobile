import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export const MyPostsItem = ({ post }) => {
  const navigation = useNavigation();
  const handleGoToPostDetail = () => {
    // TODO:
    console.log("GO TO POST DETAIL", post.id);
  };

  return (
    <Card containerStyle={styles.card}>
      <Pressable onPress={handleGoToPostDetail}>
        <Text style={styles.description}>{post.description}</Text>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  description: {
    padding: 10,
  },
});
