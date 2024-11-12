Data Model
The application utilizes Firebase Firestore to manage data, organized into three primary collections:

1.Users
2.Posts
3.Events
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