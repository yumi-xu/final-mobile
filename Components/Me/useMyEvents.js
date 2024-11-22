import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../Firebase/firebaseSetup";
import { useLoginUserId } from "../UserContext";

export const useMyEvents = () => {
  const myUserId = useLoginUserId();

  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    //query my events from database
    const postsQuery = query(
      collection(database, "Events"),
      where("owner", "==", myUserId)
    );

    const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
      const updatedItems = querySnapshot.docs.map((snapDoc) => ({
        ...snapDoc.data(),
        id: snapDoc.id,
      }));
      setMyEvents(updatedItems);
    });

    return () => unsubscribePosts();
  }, []);

  return myEvents;
};
