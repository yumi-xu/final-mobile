import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { eventDetail } from "../Styles";
export default function EventDetail({ route, navigation }) {
  const { event } = route.params;

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: eventDetail.container,
  map: eventDetail.map,
  detailsContainer: eventDetail.detailsContainer,
  title: eventDetail.title,
  dateTime: eventDetail.dateTime,
  location: eventDetail.location,
  description: eventDetail.description,
  buttonContainer: eventDetail.buttonContainer,
});

