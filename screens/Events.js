import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, SearchBar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { eventItem, events } from "../Styles";
import useSubscribeToEventsWithReminders from "../Components/useSubscribeToEventsWithReminders";
const sortOptions = [
  { label: "Title", value: "title" },
  { label: "Date", value: "date" },
];

export default function EventScreen() {
  const navigation = useNavigation();
  const events = useSubscribeToEventsWithReminders();

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Filter and sort events based on search and sort option
  useEffect(() => {
    let updatedEvents = [...events];

    // Filter by search text
    if (search) {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by selected option
    if (sortOption) {
      if (sortOption === "date") {
        updatedEvents.sort(
          (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
        );
      } else if (sortOption === "title") {
        updatedEvents.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    setFilteredEvents(updatedEvents);
  }, [events, search, sortOption]);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
      />
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <Dropdown
          data={sortOptions}
          labelField="label"
          valueField="value"
          placeholder="Default"
          value={sortOption}
          onChange={(item) => setSortOption(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.itemText}
        />
      </View>
      <View>
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => navigation.navigate("EventDetails", { event })}
          >
            <Card key={event.id} containerStyle={styles.card}>
              <Text style={styles.title}>{event.title}</Text>
              <Text
                style={styles.location}
              >{`Location: ${event.location}`}</Text>
              <Text style={styles.dateTime}>{event.dateTime}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: events.container,
  searchBar: events.searchBar,
  searchInput: events.searchInput,
  sortContainer: events.sortContainer,
  sortLabel: events.sortLabel,
  dropdown: events.dropdown,
  card: events.card,
  mapContainer: events.mapContainer,
  map: events.map,
  title: eventItem.title,
  location: eventItem.location,
  dateTimeL: eventItem.dateTime,
});
