import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { commonStyles } from "../Styles";

const cityItems = [
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
];

const CitySelector = ({ selectedCity, onCityChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedCity || "");

  return (
    <View style={[styles.container, open && { zIndex: 1000 }]}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={cityItems}
        setOpen={setOpen}
        setValue={(city) => {
          setValue(city);
          onCityChange(city); // 更新父组件的状态
        }}
        placeholder="Choose a city"
        style={commonStyles.dropdown}
        textStyle={commonStyles.dropdownText}
        dropDownContainerStyle={commonStyles.dropdownContainer}
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
  selectedText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default CitySelector;
