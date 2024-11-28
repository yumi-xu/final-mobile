import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import NotificationManager from "./NotificationManager";
import moment from "moment";
const useSubscribeToEventsWithReminders = () => {
  const [events, setEvents] = useState([]);
  const notification = NotificationManager();
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
        if (event.requiresReminder && event.dateTime) {
          scheduleNotification(event);
        }
      });
    };

    const scheduleNotification = (event) => {
      const eventDate = new Date(event.dateTime).toISOString(); //(dynamic value from service)
      const reminderDate = moment(eventDate).subtract(1, "days");
      const currentDate = moment().startOf("day");
      const validDate = currentDate.isSameOrAfter(reminderDate);
      if (validDate) {
        // console.log("cu", currentDate);
        // console.log("re", reminderDate);
        notification.scheduleNotification(
          "Event Reminder",
          `Don't forget about the event "${event.title}" at ${moment(eventDate).format("YYYY/MM/DD")}!`,
          5
        );
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
