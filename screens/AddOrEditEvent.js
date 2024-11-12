import React, { useState } from "react";
import { Alert, View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text, Switch } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import DatePicker from "../Components/Datepicker";
import { updateDB, writeToDB } from "../Firebase/firestoreHelper";

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAP_APIKEY);
export default function AddEditEvent({ route, navigation }) {
  const event = route.params?.event;
  const isEditMode = event !== undefined;
  const initialEvent = event || {
    title: "",
    location: "",
    description: "",
    dateTime: new Date(),
    coordinates: { latitude: 49.2827, longitude: -123.1207 },
  };

  const [title, setTitle] = useState(initialEvent.title);
  const [location, setLocation] = useState(initialEvent.location);
  const [description, setDescription] = useState(initialEvent.description);
  const [dateTime, setDateTime] = useState(new Date(initialEvent.dateTime));
  const [reminder, setReminder] = useState(false);
  const [coordinates, setCoordinates] = useState(initialEvent.coordinates);

  const handleSave = () => {
    const newEvent = {
      title,
      location,
      description,
      dateTime: dateTime.toDateString(),
      coordinates,
    };
    if (!isEditMode) {
      writeToDB(newEvent, "Events");
      navigation.goBack();
      return;
    }
    Alert.alert(
      "Important",
      "Are you sure you want to save these changes?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            updateDB(event.id, newEvent, "Events");
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDateChange = (date) => {
    setDateTime(date);
  };

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordinates({ latitude, longitude });
    try {
      const response = await Geocoder.from(latitude, longitude);
      if (response.results.length > 0) {
        const address = response.results[0].formatted_address;
        setLocation(address); // Update the location state with the address
      }
    } catch (error) {
      alert("Error fetching address");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <Input
        placeholder="Enter event title"
        value={title}
        onChangeText={setTitle}
        containerStyle={styles.innerInputContainer}
      />
      <Text style={styles.label}>Description *</Text>
      <Input
        placeholder="Enter event description"
        value={description}
        onChangeText={setDescription}
        multiline
        containerStyle={styles.innerInputContainer}
      />
      <Text style={styles.label}>Date and Time *</Text>
      <DatePicker date={dateTime} onDateChange={handleDateChange} />
      <Text style={styles.label}>Selected Location *</Text>
      <Text style={styles.locText}>{location}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialEvent.coordinates.latitude,
          longitude: initialEvent.coordinates.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={coordinates} />
      </MapView>
      <View style={styles.reminderContainer}>
        <Switch value={reminder} onValueChange={setReminder} />
        <Text style={styles.reminderText}>
          Remind me 24 hours before the event starts
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.cancelButton}
        />
        <Button
          title="Save"
          onPress={handleSave}
          buttonStyle={styles.saveButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    // marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  locText: {
    padding: 10,
  },
  map: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  reminderText: {
    marginLeft: 10,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    paddingHorizontal: 30,
  },
  saveButton: {
    paddingHorizontal: 30,
  },
});
