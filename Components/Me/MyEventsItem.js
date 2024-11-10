import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Button, Card, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export const MyEventsItem = ({ event }) => {
  const navigation = useNavigation();
  const handleGoToEventDetail = () => {
    // TODO:
    console.log("GO TO EVENT DETAIL", event.id);
  };

  const handleGoToEdit = () => {
    // TODO:
    console.log("GO TO EDIT EVENT", event.id);
  };

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <Pressable onPress={handleGoToEventDetail} style={styles.left}>
          <Text style={styles.description}>{event.description}</Text>
        </Pressable>
        <Button onPress={handleGoToEdit}>
          <Icon name="pencil-outline" type="ionicon" size={24} />
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
  },
  description: {
    padding: 10,
  },
});
