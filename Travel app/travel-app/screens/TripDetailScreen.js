import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
// import:
import { toggleFavorite } from "../store/actions/trips";

// Add useDispatch
import { useSelector, useDispatch } from "react-redux";

const TripDetailScreen = (props) => {
  const availableTrips = useSelector((state) => state.trips.trips);
  const tripId = props.navigation.getParam("tripId");

  // 1. Add check: to get the state
  // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
  // check if tripId -> the current trip - is part of our favorites
  const currentTripIsFavorite = useSelector((state) =>
    state.trips.favoriteTrips.some((trip) => trip.id === tripId)
  );

  const selectedTrip = availableTrips.find((trip) => trip.id === tripId);
  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(tripId));
  }, [dispatch, tripId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  // Add another useEffect ->
  // Run after every cycle: update the isFav. We will use isFav in navigationOptions
  useEffect(() => {
    props.navigation.setParams({ isFav: currentTripIsFavorite });
  }, [currentTripIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedTrip.imageUrl }} style={styles.image} />
      <View style={{ ...styles.tripRow, ...styles.tripDetail }}>
        <Text>{selectedTrip.duration}</Text>
        <Text>{selectedTrip.complexity.toUpperCase()}</Text>
        <Text>{selectedTrip.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Description</Text>
      <View style={styles.listItem}>
        <Text>{selectedTrip.description}</Text>
      </View>
      <Text style={styles.title}>Steps</Text>
      {selectedTrip.steps.map((step) => (
        <View style={styles.listItem}>
          <Text key={step}>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
TripDetailScreen.navigationOptions = (navigationData) => {
  const tripTitle = navigationData.navigation.getParam("tripTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");

  // Add variable to get isFav
  const isFavorite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: tripTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          // instead of always rendering ios-star:
          // render full / empty:
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default TripDetailScreen;