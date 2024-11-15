import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, SearchBar } from "@rneui/themed";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, database } from "../Firebase/firebaseSetup";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
const sortOptions = [
  { label: "Title", value: "title" },
  { label: "Date", value: "date" },
];

export default function EventScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Subscribe to Events collection
    const unsubscribeEvents = onSnapshot(
      collection(database, "Events"),
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id,
        }));
        setEvents(updatedItems); // Update state with fetched items
      },
      (error) => {
        console.error("Error fetching events:", error); // Log errors if any
      }
    );
    return () => unsubscribeEvents();
  }, []);

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
      } else if (sortOption === "name") {
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
  container: {
    flex: 1,
  },
  searchBar: {
    marginBottom: 10,
    overflow: "hidden",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  sortLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    height: 30,
    borderColor: "#ccc",
    minWidth: "30%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 0,
    marginBottom: 20,
  },
  mapContainer: {
    position: "relative",
  },
  map: {
    height: 200,
    width: "100%",
  },
  dateTime: {
    fontSize: 14,
    margin: 10,
    marginTop: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  location: {
    fontSize: 14,
    margin: 10,
    marginTop: 0,
  },
});
