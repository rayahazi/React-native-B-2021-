# Dispatch data & redux logic - keep favorites:

- dispatch = לשגר, לשלוח

## 1. trips.js in actions

Create file in `actions` trips.js:

```js
// unique identifier:
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

// function that creates the action:
export const toggleFavorite = (id) => {
  //
  return { type: TOGGLE_FAVORITE, tripId: id };
};
```

## 2. trips.js in reducers

Process: If user presss favorite on trip ->
if trip exists in favoriteTrips array -> it will remvoe it.
else -> it will add it.

```js
import { TRIPS } from "../../data/dummy-data";
// import:
import { TOGGLE_FAVORITE } from "../actions/trips";

const initialState = {
  trips: TRIPS,
  filteredTrips: TRIPS,
  favoriteTrips: [],
};

/*
Process: If user presss favorite on trip ->
if trip exists in favoriteTrips array -> it will remvoe it.
else -> it will add it.

// Add switch-case:
// 2 cases: TOGGLE_FAVORITE, default
*/
const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      // find index in favoriteTrips array:
      const existingIndex = state.favoriteTrips.findIndex(
        (trip) => trip.id === action.tripId
      );
      // check if not returned -1 from findIndex:
      if (existingIndex >= 0) {
        // Create new array to return with the state:
        // new array with the existing data in favoriteTrips
        const updatedFavtrips = [...state.favoriteTrips];
        // remove trip from array in the index given:
        updatedFavtrips.splice(existingIndex, 1);
        return { ...state, favoriteTrips: updatedFavtrips };
        // else -> if we did not find a product we want to edit:
        // Add the trip to the array:
      } else {
        const trip = state.trips.find((trip) => trip.id === action.tripId);
        return { ...state, favoriteTrips: state.favoriteTrips.concat(trip) };
      }
    default:
      return state;
  }
};

export default tripsReducer;
```

## 3. In TripDetailScreen.js: use the redux state:

in TripDetailScreen we can mark trip as favorite:

```js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
// import:
import { toggleFavorite } from "../store/actions/trips";

// Add useDispatch
import { useSelector, useDispatch } from "react-redux";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

// 1.import
// we cannot use redux directly in navigation -> therefore we will start in TripDetailScreen

const TripDetailScreen = (props) => {
  const availableTrips = useSelector((state) => state.trips.trips);

  const tripId = props.navigation.getParam("tripId");
  const selectedTrip = availableTrips.find((trip) => trip.id === tripId);

  // 2. variable to call the funtion:
  const dispatch = useDispatch();

  // 3. function of callback: uses dispatch
  // Add useCallback to avoid infinite loop:
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(tripId));
    // dispach dependency will never change, tripId can change
  }, [dispatch, tripId]);

  // 4. Add useEffect to run after every cycle if change:
  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    // Add as dependency:
  }, [toggleFavoriteHandler]);

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
  // 5. remove: const tripId = navigationData.navigation.getParam("tripId");

  const tripTitle = navigationData.navigation.getParam("tripTitle");

  // 6. Add here -> get toggleFav from above:
  // toggleFavorite hold ref to the function:
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");

  return {
    headerTitle: tripTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          // 7. change onPress:
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
```

## 4. Change star -> empty or full depending on the state: TripDetailScreen.js

```js
import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
// import:
import { toggleFavorite } from "../store/actions/trips";

// Add useDispatch
import { useSelector, useDispatch } from "react-redux";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};
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
```
