import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CitySelector = ({ selectedCity, onCityChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedCity || "");
  const [items, setItems] = useState([
    { label: "Vancouver", value: "Vancouver" },
    { label: "Victoria", value: "Victoria" },
    { label: "Richmond", value: "Richmond" },
    { label: "Surrey", value: "Surrey" },
    { label: "Burnaby", value: "Burnaby" },
    { label: "Calgary", value: "Calgary" },
    { label: "Edmonton", value: "Edmonton" },
    { label: "Toronto", value: "Toronto" },
    { label: "Montreal", value: "Montreal" },
    { label: "Ottawa", value: "Ottawa" },
    { label: "Winnipeg", value: "Winnipeg" },
    { label: "Halifax", value: "Halifax" },
    { label: "Whitehorse", value: "Whitehorse" },
    { label: "Iqaluit", value: "Iqaluit" },
  ]);

  return (
    <View style={[styles.container, open && { zIndex: 1000 }]}>
      <Text style={styles.title}>Select a City</Text>
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(city) => {
          setValue(city);
          onCityChange(city); // 更新父组件的状态
        }}
        setItems={setItems}
        placeholder="Choose a city"
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownContainer}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        zIndex={1000}
        zIndexInverse={1000}
      />
      <Text style={styles.selectedText}>Selected City: {value || "None"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  dropdown: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownContainer: {
    width: 200,
    borderColor: "#ccc",
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default CitySelector;