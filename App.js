import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Me from "./Components/Me";
import MeEdit from "./Components/MeEdit";
import Posts from "./screens/Posts";
import AddPost from "./screens/AddPost";
import { Button, Icon } from "@rneui/base";
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
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          // Adding a custom AddButton in the header for Activities and Diets, not for Settings
          headerRight: () => {
            return route.name !== "Settings" ? (
              <Button
                title="Add Post"
                onPress={() => navigation.navigate("AddPost")}
              />
            ) : null;
          },
        })}
      >
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Me" component={Me} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Tab.Screen name="MeEdit" component={MeEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
