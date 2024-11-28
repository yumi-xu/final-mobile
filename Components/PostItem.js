import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Avatar, Icon } from "@rneui/themed";
import { updateDB } from "../Firebase/firestoreHelper";
import { useMyUserInfo } from "./Me/useMyUserInfo";
import { downloadImage } from "./ImageManager";
import { postItem } from "../Styles";

export default function PostItem({ item: post }) {
  const [favoriteCount, setFavoriteCount] = useState(post.favoriteCount || 0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState(null);

  const userInfo = useMyUserInfo();
  useEffect(() => {
    if (userInfo.favoritePosts.includes(post.id)) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [post.id]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // Fetch both image and user avatar in parallel
        const [image, avatar] = await Promise.all([
          downloadImage(post.imageUrl),
          downloadImage(post.userAvatar),
        ]);

        // Set states for both the image and avatar
        setImageUrl(image);
        setUserAvatarUrl(avatar);
      } catch (error) {
        console.error("Error downloading assets:", error); // Handle any errors
      }
    };

    if (post.imageUrl && post.userAvatar) {
      fetchAssets();
    }
  }, [post.imageUrl, post.userAvatar]);

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
        {userAvatarUrl && (
          <Avatar rounded source={{ uri: userAvatarUrl }} />
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
  card: postItem.card,
  header: postItem.header,
  userName: postItem.userName,
  favoriteContainer: postItem.favoriteContainer,
  favoriteCount: postItem.favoriteCount,
  postImage: postItem.postImage,
  description: postItem.description,
});