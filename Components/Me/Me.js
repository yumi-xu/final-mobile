import React from "react";
import { ScrollView } from "react-native";
import { Header } from "./Header";
import { MyEvents } from "./MyEvents";
import { Weather } from "./Weather";

export default function Me() {
  return (
    <ScrollView>
      <Header />
      <MyEvents />
      <Weather />
    </ScrollView>
  );
}
