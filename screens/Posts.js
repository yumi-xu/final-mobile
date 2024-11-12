import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import PostItem from "../Components/PostItem";

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
        <PostItem key={post.id} item={post} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
