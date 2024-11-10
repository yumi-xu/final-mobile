import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../Firebase/firebaseSetup";

export const useUpdateUserInfo = () => {
  //TODO: add auth in iteration 2
  const userId = "123";

  return async (userInfo) => {
    const docRef = doc(database, "users", userId);
    await updateDoc(docRef, userInfo);
  };
};
