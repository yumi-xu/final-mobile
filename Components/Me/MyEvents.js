import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Icon, Text } from "@rneui/themed";
import { useMyEvents } from "./useMyEvents";
import { useNavigation } from "@react-navigation/native";
import { eventItem } from "../../Styles";
import { deleteFromDB } from "../../Firebase/firestoreHelper";

export const MyEvents = () => {
  const myEvents = useMyEvents();
  const navigation = useNavigation();

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteFromDB(id, "Events");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (event) => {
    navigation.navigate("AddEditEvent", { event });
  };
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>My Events</Card.Title>
      {myEvents.map((event) => {
        return (
          <View key={event.id}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EventDetails", { event })}
            >
              <Card containerStyle={styles.card}>
                <Text style={styles.title}>{event.title}</Text>
                <Text
                  style={styles.location}
                >{`Location: ${event.location}`}</Text>
                <Text style={styles.dateTime}>{event.dateTime}</Text>
                <View style={styles.iconContainer}>
                  <Icon
                    name="edit"
                    type="material"
                    size={24}
                    color="black"
                    onPress={() => handleEdit(event)}
                    containerStyle={styles.icon}
                  />
                  <Icon
                    name="delete"
                    type="material"
                    size={24}
                    color="black"
                    onPress={() => handleDelete(event.id)}
                    containerStyle={styles.icon}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: eventItem.card,
  title: eventItem.title,
  location: eventItem.location,
  dateTimeL: eventItem.dateTime,
  iconContainer: eventItem.iconContainer,
});
