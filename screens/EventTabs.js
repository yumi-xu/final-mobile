import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import EventScreen from "./Events";

export default function EventTabs() {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: "events", title: "All Events" },
    { key: "myEvents", title: "My Events" },
  ]);

  const renderScene = SceneMap({
    events: () => <EventScreen isFetchAll={true} />,
    myEvents: () => <EventScreen isFetchAll={false} />,
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