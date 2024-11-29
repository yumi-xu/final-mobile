import React from "react";
import WeatherApp from "../WeatherApp";
import { Card } from "@rneui/themed";
import { meStyles } from "../../Styles";

export const Weather = () => {
  return (
    <Card containerStyle={meStyles.section}>
      <Card.Title>Weather Information</Card.Title>
      <WeatherApp />
    </Card>
  );
};
