import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getAllEvents } from "../Firebase/firestoreHelper"; // 假设有一个函数来获取所有事件

export default function MapAll({ navigation }) {
  const [events, setEvents] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents(); // 获取所有事件数据
        console.log(eventsData);
        setEvents(eventsData);

        if (eventsData.length > 0 && mapRef.current) {
          const coordinates = eventsData.map((event) => event.coordinates);
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }
      } catch (error) {
        console.error("Error fetching events: ", error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleMarkerPress = (event) => {
    navigation.navigate("EventDetails", { event });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.785834,
          longitude: -122.406417,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {events.length > 0 &&
          events.map((event) => (
            <Marker
              key={event.id}
              coordinate={event.coordinates}
              title={event.title}
              description={event.description}
              onPress={() => handleMarkerPress(event)}
            />
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
