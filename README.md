Data Model
1. Users Collection
   The Users collection captures essential profile details for each user. This information includes the user’s name, age, gender, contact information, avatar, and a brief description. This structure supports user authentication and personalized experiences across the app.

Key Fields:
name: The user’s full name, displayed on their profile.
age: User’s age, useful for age-based content or filtering.
sex: User’s gender, aiding personalization.
avatar: URL of the user’s profile picture, displayed in various components.
email, phone: Contact details.
address: User’s location for context in social interactions.
description: Short bio or description about the user.
This model supports CRUD operations, enabling users to create, view, and edit their profiles. This data is read by various components, such as Me.js, for a consistent profile view across the app.

2. Posts Collection
   The Posts collection is designed to manage user-generated content. This includes images, descriptions, and metadata linking each post to the user who created it. The structure enables social sharing and is optimized for displaying posts in feeds or profile views.

Key Fields:
image: URL of the image associated with the post, enabling media-rich content.
description: Text description of the post, allowing users to share thoughts or captions with their images.
userId: The unique ID of the user who created the post, used to link posts to their respective creators.
userName, userAvatar: Cached data for displaying the post’s author information, optimizing loading speeds in the UI.
This collection supports the core social functionality of the app by enabling users to create, view, and delete posts. The data is accessed through components like AddPost.js, MyPosts.js, and MyPostsItem.js.

3. Events Collection
   The Events collection manages data related to events organized by users. This includes event details such as title, description, date, time, and location. The structured event information supports an event-sharing and reminder system within the app.

Key Fields:
title: Name of the event, displayed in event listings and detail views.
description: Detailed event information, allowing attendees to understand what the event is about.
dateTime: Date and time of the event, supporting scheduling and reminders.
location: Descriptive location or address of the event.
coordinates: Latitude and longitude for map display and navigation purposes.
owner: The unique ID of the event creator, linking the event to its creator.
The Events collection is essential for the app’s event-management feature, enabling users to organize, update, and delete events. CRUD operations are applied through helper functions (firestoreHelper.js) and are accessed in AddOrEditEvent.js.

CRUD Operations Summary
Each collection is used to store distinct data entities, with specific CRUD (Create, Read, Update, Delete) operations applied to each.

Collection Details
1. Users
   Purpose: Stores user profile information, including name, age, avatar, contact details, and description.
   CRUD Operations:
   Create: Adds new user information upon user sign-up or initialization.
   Read: Fetches user details to display in profile-related components (e.g., Me.js and UserContext.js).
   Update: Allows users to edit their profile information, with updates saved to Firestore (MeEdit.js).
   Delete: Not implemented explicitly for user data in this setup.
2. Posts
   Purpose: Manages user-generated content, allowing users to create posts with images and descriptions.
   CRUD Operations:
   Create: Adds new posts created by users, including image and description (AddPost.js).
   Read: Fetches posts to display on the user's profile or feed (MyPosts.js, MyPostsItem.js).
   Update: Not implemented, as posts are currently static once created.
   Delete: Provides functionality to delete a user’s post if needed (firestoreHelper.js).
3. Events
   Purpose: Stores details for events, including title, description, date/time, location, and coordinates.
   CRUD Operations:
   Create: Allows users to create new events with location, date, and time details (AddOrEditEvent.js).
   Read: Retrieves events to display in various components.
   Update: Users can edit existing events, with updates saved in Firestore (AddOrEditEvent.js).
   Delete: Users can delete events if they are no longer relevant (firestoreHelper.js).
   CRUD Implementation
   The CRUD operations are implemented using Firebase Firestore’s API functions (firestoreHelper.js), enabling seamless data interaction:

Create: Using addDoc or setDoc for inserting data in collections.
Read: Retrieving data using getDocs and onSnapshot.
Update: Modifying document fields with updateDoc.
Delete: Removing documents using deleteDoc.
Each component in the app interacts with the Firestore database through these helper functions to maintain data consistency across the application.