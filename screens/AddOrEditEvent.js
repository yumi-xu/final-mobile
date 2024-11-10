import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return (
    <ScrollView style={styles.container}>
      <Text h4 style={styles.header}>
        {isEditMode ? "Edit Event" : "Add Event"}
      </Text>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        containerStyle={styles.inputContainer}
      />
      <Button
        title={`Select Date & Time: ${dateTime.toDateString()} ${dateTime.toLocaleTimeString()}`}
        onPress={() => setShowDatePicker(true)}
        containerStyle={styles.dateButtonContainer}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dateTime}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || dateTime;
            setShowDatePicker(false);
            setDateTime(currentDate);
          }}
        />
      )}
      <Button
        title="Save Event"
        onPress={handleSave}
        containerStyle={styles.saveButtonContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    marginBottom: 20,
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 15,
  },
  dateButtonContainer: {
    marginBottom: 20,
  },
  saveButtonContainer: {
    marginTop: 20,
  },
});
