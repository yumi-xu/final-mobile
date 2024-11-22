import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "@rneui/themed";
import { useMyEvents } from "./useMyEvents";
import { useNavigation } from "@react-navigation/native";
import { eventItem } from "../../Styles";

export const MyEvents = () => {
  const myEvents = useMyEvents();
  const navigation = useNavigation();
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>My Events</Card.Title>
      {myEvents.map((event) => {
        return (
          <TouchableOpacity
            key={event.id}
            onPress={() => navigation.navigate("EventDetails", { event })}
          >
            <Card key={event.id} containerStyle={styles.card}>
              <Text style={styles.title}>{event.title}</Text>
              <Text
                style={styles.location}
              >{`Location: ${event.location}`}</Text>
              <Text style={styles.dateTime}>{event.dateTime}</Text>
            </Card>
          </TouchableOpacity>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: eventItem.title,
  location: eventItem.location,
  dateTimeL: eventItem.dateTime,
});
