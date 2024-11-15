import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Avatar, Icon } from "@rneui/themed";
import { updateDB } from "../Firebase/firestoreHelper";
import { useMyUserInfo } from "./Me/useMyUserInfo";
import { downloadImage } from "./ImageManager";

export default function PostItem({ item: post }) {
  const [favoriteCount, setFavoriteCount] = useState(post.favoriteCount || 0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const userInfo = useMyUserInfo();

  useEffect(() => {
    if (userInfo.favoritePosts.includes(post.id)) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [post.id]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await downloadImage(post.imageUrl); // Wait for the image to download
        setImageUrl(image); // Set the image state once downloaded
      } catch (error) {
        console.error("Error downloading image:", error); // Handle any errors
      }
    };

    if (post.imageUrl) {
      fetchImage();
    }
  }, [post.imageUrl]);

  // Toggle favorite status and update count
  const toggleFavorite = () => {
    const newFavoriteCount = isFavorited
      ? favoriteCount - 1
      : favoriteCount + 1;
    const updatedFavoritePosts = isFavorited
      ? userInfo.favoritePosts.filter((id) => id !== post.id) // Remove post.id if it's already in favorites
      : [...(userInfo.favoritePosts ?? []), post.id];
    setIsFavorited(!isFavorited);
    setFavoriteCount(newFavoriteCount);
    updateDB(post.id, { favoriteCount: newFavoriteCount }, "Posts");
    updateDB(userInfo.id, { favoritePosts: updatedFavoritePosts }, "users");
  };
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        {post.userAvatar && (
          <Avatar rounded source={{ uri: post.userAvatar }} />
        )}
        <Text style={styles.userName}>{post.userName}</Text>
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
          {isFavorited && (
            <Text style={styles.favoriteCount}>{favoriteCount}</Text>
          )}
        </TouchableOpacity>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.postImage} />
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
    justifyContent: "space-between",
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
    flex: 1,
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteCount: {
    marginLeft: 5,
    color: "gray",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  description: {
    padding: 10,
  },
});
