import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = ({ route }) => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Houses" component={ListingsScreen} />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={{ title: "House Info" }}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
