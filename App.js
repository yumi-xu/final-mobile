import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Me from "./Components/Me/Me";
import MeEdit from "./Components/Me/MeEdit";
import Posts from "./screens/Posts";
import AddPost from "./screens/AddPost";
import { Button, Icon } from "@rneui/base";
import Events from "./screens/Events";
import EventDetail from "./screens/EventDetail";
import AddEditEvent from "./screens/AddOrEditEvent";
import { TouchableOpacity } from "react-native";
// import AntDesign from "@expo/vector-icons/AntDesign";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // TODO:need auth
  const isUserLoggedIn = true;
  const AuthStack = (
    <>
      {/*<Stack.Screen name="Login" component={Login} />*/}
      {/*<Stack.Screen name="Signup" component={Signup} />*/}
    </>
  );

  const Tabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Post"
          component={Posts}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("AddPost")}>
                <Icon name="add-circle" type="ionicon" size={30} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name="Event"
          component={Events}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("AddEditEvent")}>
                <Icon name="add-circle" type="ionicon" size={30} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen name="Me" component={Me} />
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
      <Tab.Screen name="MeEdit" component={MeEdit} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>{isUserLoggedIn ? AppStack : AuthStack}</Stack.Navigator>
    </NavigationContainer>
  );
}
