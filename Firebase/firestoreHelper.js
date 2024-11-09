import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
  try {
    const docRef = doc(database, collectionName, deletedId);
    await deleteDoc(docRef);
  } catch (err) {
    console.log("Error deleting document: ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    // Retrieve all documents from the collection
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (err) {
    console.log("Error deleting all documents: ", err);
  }
}

// Function to add a notify field
export async function addNotifyToEvent(eventId, collectionName) {
  try {
    const docRef = doc(database, collectionName, eventId);
    await updateDoc(docRef, {
      notify: true,
    });
  } catch (err) {
    console.log("Error updating event with notify: ", err);
  }
}

export async function getAllDocument(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = querySnapshot.docs.map((docSnap) => {
      return docSnap.data();
    });
    return data;
  } catch (err) {
    console.log("Error get all document: ", err);
  }
}
