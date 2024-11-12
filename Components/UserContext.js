import React, { createContext, useEffect, useContext, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
const LoginUserIdContext = createContext("");

export const LoginUserIdProvider = ({ userId, children }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    // Subscribe to userInfo collection
    const unsubscribeuserInfo = onSnapshot(
      collection(database, "users"),
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id, // Adding document ID
        }));
        setUserInfo(updatedItems);
      }
    );
    return () => unsubscribeuserInfo();
  }, []);
  return (
    <LoginUserIdContext.Provider value={{ userInfo, userId }}>
      {children}
    </LoginUserIdContext.Provider>
  );
};

export const useLoginUserId = () => {
  return useContext(LoginUserIdContext);
};
