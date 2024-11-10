import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { useMyEvents } from "./useMyEvents";
import { MyEventsItem } from "./MyEventsItem";

export const MyEvents = () => {
  const myEvents = useMyEvents();
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>My Events</Card.Title>
      {myEvents.map((event) => {
        return <MyEventsItem key={event.id} event={event} />;
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
});
