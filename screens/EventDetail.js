import React from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";
import { deleteFromDB } from "../Firebase/firestoreHelper";
import { auth } from "../Firebase/firebaseSetup";

export default function EventDetail({ route, navigation }) {
  const { event } = route.params;

  const handleDelete = () => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteFromDB(event.id, "Events");
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: event.coordinates.latitude,
          longitude: event.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={event.coordinates} />
      </MapView>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.dateTime}>{`Date & Time: ${event.dateTime}`}</Text>
        <Text style={styles.location}>{`Location: ${event.location}`}</Text>
        <Text
          style={styles.description}
        >{`Description: ${event.description}`}</Text>
        {event.owner === auth.currentUser?.uid && (
          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("AddEditEvent", { event: event })
              }
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => handleDelete()} // Handle event deletion
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 250,
    width: "100%",
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
