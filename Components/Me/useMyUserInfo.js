import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../Firebase/firebaseSetup";
import { useLoginUserId } from "../UserContext";

export const useMyUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    sex: "",
    avatar: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const userId = useLoginUserId();

  useEffect(() => {
    if (!userId) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(database, "users", userId),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("read data is", data);
          setUserInfo({
            name: data.name || "",
            age: data.age || "",
            sex: data.sex || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            description: data.description || "",
          });
        } else {
          console.log("No such document!");
        }
      },
    );
    // Cleanup function to detach the listener
    return () => {
      unsubscribe();
    };
  }, []);
  return userInfo;
};
