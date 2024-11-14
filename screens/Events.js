import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../Firebase/firebaseSetup";
import { useNavigation } from "@react-navigation/native";

export default function EventScreen({ isFetchAll }) {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const fetchEvents = () => {
    // Define the query based on `isFetchAll`
    const eventsQuery = isFetchAll
      ? collection(database, "Events")
      : query(
          collection(database, "Events"),
          where("owner", "==", auth.currentUser.uid)
        );

    return eventsQuery;
  };
  useEffect(() => {
    // Subscribe to Events collection
    const unsubscribeEvents = onSnapshot(
      fetchEvents(isFetchAll),
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id,
        }));
        setEvents(updatedItems); // Update state with fetched items
      },
      (error) => {
        console.error("Error fetching events:", error); // Log errors if any
      }
    );
    return () => unsubscribeEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          onPress={() => navigation.navigate("EventDetails", { event })}
        >
          <Card key={event.id} containerStyle={styles.card}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.location}>{`Location: ${event.location}`}</Text>
            <Text style={styles.dateTime}>{event.dateTime}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 0,
    marginBottom: 20,
  },
  mapContainer: {
    position: "relative",
  },
  map: {
    height: 200,
    width: "100%",
  },
  dateTime: {
    fontSize: 14,
    margin: 10,
    marginTop: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  location: {
    fontSize: 14,
    margin: 10,
    marginTop: 0,
  },
});
