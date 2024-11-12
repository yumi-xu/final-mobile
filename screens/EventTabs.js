import React, { useState } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import EventScreen from "./Events";

export default function EventTabs({ navigation }) {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: "events", title: "All Events" },
    { key: "myEvents", title: "My Events" },
  ]);

  const renderScene = SceneMap({
    events: EventScreen,
    myEvents: EventScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
  },

  activeTab: {
    color: "#D32F2F", // Red color for active tab
    fontWeight: "bold",
  },
  inactiveTab: {
    color: "white", // White color for inactive tab
  },
});
