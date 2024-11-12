import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import { useNavigation } from "@react-navigation/native";

const events = [
  {
    id: 1,
    title: "Event1A",
    dateTime: "Mon Apr 22 2024 17:30",
    location: "Google Building 40, Mountain View, CA",
    coordinates: { latitude: 37.422, longitude: -122.084 },
    description: "settle down",
  },
  {
    id: 2,
    title: "Test2",
    dateTime: "Tue Apr 23 2024 21:21",
    location: "San Francisco–Oakland Bay Bridge, San Francisco, CA",
    coordinates: { latitude: 37.798, longitude: -122.377 },
    description: "testtestest",
  },
  // Add more event objects as needed
];

export default function EventScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Subscribe to Events collection
    const unsubscribeEvents = onSnapshot(
      collection(database, "Events"),
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id, // Adding document ID
        }));
        setEvents(updatedItems);
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
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: event.coordinates.latitude,
                  longitude: event.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker coordinate={event.coordinates} />
              </MapView>
            </View>
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
    backgroundColor: "#2a2a4f",
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
    color: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: "#fff",
  },
  location: {
    fontSize: 14,
    margin: 10,
    marginTop: 0,
    color: "#ccc",
  },
});
