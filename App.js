import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "./Firebase/firebaseSetup";
// import { Button } from "react-native";
import MeCollection from "./Components/MeCollection";
// import AntDesign from "@expo/vector-icons/AntDesign";

const Stack = createStackNavigator();

export default function App() {
  const AppStack = (
    <>
      <Stack.Screen name="Me" component={MeCollection} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {AppStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
