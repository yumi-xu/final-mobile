import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import CitySelector from "./CitySelector";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  const fetchWeather = async (city) => {
    const apiKey = process.env.EXPO_PUBLIC_weatherApiKey;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null); // clear before weather
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  return (
    <View style={styles.container}>
      <CitySelector
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading Weather Data...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>
            Weather in {weatherData.location.name}
          </Text>
          <Text>Temperature: {weatherData.current.temp_c}°C</Text>
          <Text>Condition: {weatherData.current.condition.text}</Text>
          <Text>Humidity: {weatherData.current.humidity}%</Text>
          <Text>Wind Speed: {weatherData.current.wind_kph} kph</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loaderContainer: {
    marginVertical: 20,
  },
  errorContainer: {
    marginVertical: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default WeatherApp;
