import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Me from "./Components/Me/Me";
import MeEdit from "./Components/Me/MeEdit";
import Posts from "./screens/Posts";
import AddPost from "./screens/AddPost";
import { Button, Icon } from "@rneui/base";
import EventDetail from "./screens/EventDetail";
import AddEditEvent from "./screens/AddOrEditEvent";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LoginUserIdProvider } from "./Components/UserContext";
import EventScreen from "./screens/Events";
import MapAll from "./Components/MapAll";
import { headerIcon } from "./Styles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userId, setUserId] = useState("");
  const isUserLoggedIn = !!userId;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // User is signed in
      } else {
        setUserId(""); // User is signed out
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserId(""); // Update state after sign-out
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </>
  );

  const Tabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Post"
          component={Posts}
          options={({ navigation, route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="document-text-outline"
                type="ionicon"
                size={size}
                color={color}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => navigation.navigate("AddPost")}
              >
                <Icon name="add-circle" type="ionicon" size={30} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name="Event"
          component={EventScreen}
          options={({ navigation, route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" type="ionicon" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => navigation.navigate("AddEditEvent")}
              >
                <Icon name="add-circle" type="ionicon" size={30} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name="Map"
          component={MapAll}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" type="ionicon" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={Me}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerIcon}
                onPress={handleSignOut}
              >
                <AntDesign name="logout" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={({ navigation }) => ({
          title: "Add Post",
          headerLeft: () => (
            <Icon
              name="arrow-back"
              type="ionicon"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetail}
        options={{ title: "Event Details" }}
      />
      <Stack.Screen
        name="AddEditEvent"
        component={AddEditEvent}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-back"
              type="ionicon"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen name="MeEdit" component={MeEdit} />
    </>
  );

  return (
    <NavigationContainer>
      <LoginUserIdProvider userId={userId}>
        <Stack.Navigator>
          {isUserLoggedIn ? AppStack : AuthStack}
        </Stack.Navigator>
      </LoginUserIdProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: headerIcon,
});
