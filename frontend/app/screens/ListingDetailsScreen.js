import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import MapView, { Marker } from "react-native-maps";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import useLocation from "../hooks/useLocation";
import CarouselSlider from "../components/CarouselSlider";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  const location = useLocation(listing.address);
  const images = listing.images.map((image) => image.url);

  return (
    <ScrollView>
      <CarouselSlider images={images} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>${listing.price} / Month</Text>
        <Text style={styles.price}>Address: {listing.address}</Text>
        <Text>{listing.description}</Text>

        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/profilePicture.png")}
            title={"Hosted by " + listing.userName}
          />
        </View>
        <ContactSellerForm listing={listing} />

        {location.latitude === 0 ? (
          <MapView style={styles.map}></MapView>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              longitude: location.longtitude,
              latitude: location.latitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.00921,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longtitude,
              }}
            />
          </MapView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.primary,
  },
  userContainer: {
    marginVertical: 40,
  },
  map: {
    height: 300,
  },
});

export default ListingDetailsScreen;
