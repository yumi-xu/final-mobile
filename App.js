import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "./Firebase/firebaseSetup";
// import { Button } from "react-native";
import Me from "./Components/Me";
import MeEdit from "./Components/MeEdit";
// import AntDesign from "@expo/vector-icons/AntDesign";

export default function App() {
  // TODO:need auth
  const isUserLoggedIn = true;
  const Stack = createStackNavigator();

  const AuthStack = (
    <>
      {/*<Stack.Screen name="Login" component={Login} />*/}
      {/*<Stack.Screen name="Signup" component={Signup} />*/}
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen name="Me" component={Me} />
      <Stack.Screen name="MeEdit" component={MeEdit} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
