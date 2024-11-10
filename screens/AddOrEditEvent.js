import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text, Switch } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";
import DatePicker from "../Components/Datepicker";

export default function AddEditEvent({ route, navigation }) {
  const isEditMode = route.params?.event !== undefined;
  const initialEvent = route.params?.event || {
    title: "",
    location: "",
    description: "",
    dateTime: new Date(),
    coordinates: { latitude: 0, longitude: 0 },
  };

  const [title, setTitle] = useState(initialEvent.title);
  const [location, setLocation] = useState(initialEvent.location);
  const [description, setDescription] = useState(initialEvent.description);
  const [dateTime, setDateTime] = useState(initialEvent.dateTime);
  const [reminder, setReminder] = useState(false);

  const handleSave = () => {
    const newEvent = {
      title,
      location,
      description,
      dateTime,
      coordinates: initialEvent.coordinates,
    };

    // Handle saving logic here (e.g., send to backend or update local state)
    navigation.goBack();
  };

  const handleDateChange = (date) => {
    setDateTime(date);
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialEvent.coordinates.latitude,
          longitude: initialEvent.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={initialEvent.coordinates} />
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
