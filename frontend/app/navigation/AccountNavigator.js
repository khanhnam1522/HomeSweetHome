import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ListingsScreen from "../screens/ListingsScreen";
import MyListingScreen from "../screens/MyListingScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="MyListings"
      component={MyListingScreen}
      options={{ title: "My Postings" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
