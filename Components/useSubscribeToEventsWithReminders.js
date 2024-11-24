import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
const useSubscribeToEventsWithReminders = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const subscribeToEvents = () => {
      const unsubscribeEvents = onSnapshot(
        collection(database, "Events"),
        (querySnapshot) => {
          const updatedItems = querySnapshot.docs.map((snapDoc) => ({
            ...snapDoc.data(),
            id: snapDoc.id,
          }));

          setEvents(updatedItems); // Update state with fetched items
          handleNotifications(updatedItems); // Handle reminders
        },
        (error) => {
          console.error("Error fetching events:", error); // Log errors if any
        }
      );

      return unsubscribeEvents;
    };

    const handleNotifications = (events) => {
      events.forEach((event) => {
        scheduleNotification(event);
      });
    };

    const scheduleNotification = (event) => {
      const currentTime = new Date();
      const reminderTime = new Date(event.dateTime); // Assuming reminderTime is a timestamp
      console.log("cu", currentTime);
      console.log("re", reminderTime);
      if (reminderTime > currentTime) {
        const triggerTime = reminderTime.getTime() - currentTime.getTime();
        // TO DO: schedule notification
      } else {
        console.log(
          `Skipped scheduling for ${event.title}, reminder time is in the past.`
        );
      }
    };

    // Call the subscribe function and store the unsubscribe method
    const unsubscribe = subscribeToEvents();

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return events; // Return the list of events for the calling component
};

export default useSubscribeToEventsWithReminders;
