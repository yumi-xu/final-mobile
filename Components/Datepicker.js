import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function DatePicker({ date, onDateChange }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTxt, setDateTxt] = useState();

  useEffect(() => {
    const value = date || new Date();
    setDateTxt(value.toDateString());
  }, [date]);

  const handleDateChange = (event, selectedDate) => {
    // If no date is selected, default to the current date
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    onDateChange(currentDate);
    setDateTxt(currentDate.toDateString());
  };
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    // If no date has been selected yet, set it to today's date
    if (!dateTxt) {
      setDateTxt(new Date().toDateString());
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDatePicker} style={styles.dateInput}>
        <Text style={styles.dateText}>{dateTxt}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 18,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dateText: {
    color: "#333",
  },
});
