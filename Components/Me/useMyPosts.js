import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../Firebase/firebaseSetup";
import { useLoginUserId } from "../UserContext";

export const useMyPosts = () => {
  const { userId: myUserId } = useLoginUserId();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const postsQuery = query(
      collection(database, "Posts"),
      where("userId", "==", myUserId)
    );

    const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
      const updatedItems = querySnapshot.docs.map((snapDoc) => ({
        ...snapDoc.data(),
        id: snapDoc.id,
      }));
      setMyPosts(updatedItems);
    });

    return () => unsubscribePosts();
  }, []);

  return myPosts;
};
