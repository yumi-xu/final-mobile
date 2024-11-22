import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../Firebase/firebaseSetup";
import { useLoginUserId } from "../UserContext";
import { DEFAULT_AVATAR } from "../helper";
import { downloadImage } from "../ImageManager";

export const useMyUserInfo = () => {
  const userId = useLoginUserId();
  const [userInfo, setUserInfo] = useState({
    id: userId,
    name: "",
    age: "",
    sex: "",
    avatar: "",
    avatarUri: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    favoritePosts: [],
  });
  useEffect(() => {
    if (!userId) {
      return;
    }
    //get me info from database
    const unsubscribe = onSnapshot(
      doc(database, "users", userId),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserInfo({
            id: userId,
            name: data.name || "",
            age: data.age || "",
            sex: data.sex || "",
            avatar: data.avatar || DEFAULT_AVATAR,
            avatarUri: data.avatar ? null : DEFAULT_AVATAR,
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            description: data.description || "",
            favoritePosts: data.favoritePosts || [],
          });
        } else {
          console.log("No such document!");
        }
      }
    );
    // Cleanup function to detach the listener
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const fetchAvatar = async () => {
      if (userInfo.avatar) {
        const avatarUri = await downloadImage(userInfo.avatar); // Assuming userInfo.avatar is the correct property
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          avatarUri,
        }));
      }
    };

    if (userId.avatar !== DEFAULT_AVATAR) {
      fetchAvatar();
    }
  }, [userInfo.avatar]);

  return userInfo;
};
