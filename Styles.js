import { StyleSheet } from "react-native";

export const headerIcon = {
  marginHorizontal: 5,
};

export const eventItem = {
  card: {
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  dateTime: {
    fontSize: 14,
    marginTop: 0,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  location: {
    fontSize: 14,
    marginTop: 0,
    margin: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
};

export const addEditEvent = {
  container: {
    flex: 1,
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  locText: {
    padding: 10,
  },
  map: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  reminderText: {
    marginLeft: 10,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    paddingHorizontal: 30,
  },
  saveButton: {
    paddingHorizontal: 30,
  },
};

export const addPost = {
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  imagePicker: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
};

export const eventDetail = {
  container: {
    flex: 1,
  },
  map: {
    height: 250,
    width: "100%",
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
};

export const events = {
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
    padding: 10,
    marginBottom: 20,
  },
  mapContainer: {
    position: "relative",
  },
  map: {
    height: 200,
    width: "100%",
  },
};

export const datePicker = {
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
};

export const postItem = {
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
    flex: 1,
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteCount: {
    marginLeft: 5,
    color: "gray",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  description: {
    padding: 10,
  },
};

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    color: "#555",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const meStyles = StyleSheet.create({
  section: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export const commonStyles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
});
