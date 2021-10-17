# Filtering logic

## 1. trips.js inside `actions`

```js
// unique identifier:
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

// 1. variable to hold filters.
export const SET_FILTERS = "SET_FILTERS";

export const toggleFavorite = (id) => {
  //
  return { type: TOGGLE_FAVORITE, tripId: id };
};

// 2. change / set data into SET_FILTERS
export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};
```

## 2. trips.js inside `reducers`

Takes care of the logic:

```js
import { TRIPS } from "../../data/dummy-data";
// 1. import:
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/trips";

const initialState = {
  trips: TRIPS,
  filteredTrips: TRIPS,
  favoriteTrips: [],
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteTrips.findIndex(
        (trip) => trip.id === action.tripId
      );
      if (existingIndex >= 0) {
        const updatedFavtrips = [...state.favoriteTrips];
        updatedFavtrips.splice(existingIndex, 1);
        return { ...state, favoriteTrips: updatedFavtrips };
      } else {
        const trip = state.trips.find((trip) => trip.id === action.tripId);
        return { ...state, favoriteTrips: state.favoriteTrips.concat(trip) };
      }
    // 2.SET_FILTERS:
    case SET_FILTERS:
      // extract filter from the actions:
      const appliedFilters = action.filters;
      // all trips available:
      // Example: if im looking for glutenFree trip, and !trip.isGlutenFree -> trip is not:
      // drop it from the list. same to all other options:
      const updatedFilteredTrips = state.trips.filter((trip) => {
        if (appliedFilters.glutenFree && !trip.isGlutenFree) return false;
        if (appliedFilters.lactoseFree && !trip.isLactoseFree) return false;
        if (appliedFilters.vegetarian && !trip.isVegetarian) return false;
        if (appliedFilters.vegan && !trip.isVegan) return false;
        // only if trip applies all filters:
        return true;
      });
      // return state to upadted array:
      return { ...state, filteredTrips: updatedFilteredTrips };
    default:
      return state;
  }
};

export default tripsReducer;
```

## 3. FiltersScreen.js

```js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
// 2. import:
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/trips";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const [isForFamilies, setIsForFamilies] = useState(false);
  const [isForDisabled, setIsForDisabled] = useState(false);
  const [hasWater, setHasWater] = useState(false);
  const [isUrban, setIsUrban] = useState(false);

  // 1. use dispatch:
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      forFamilies: isForFamilies,
      forDisabled: isForDisabled,
      hasWater: hasWater,
      isUrban: isUrban,
    };
    //3.  remove: console.log(appliedFilters);
    // 4. change to dispatch:setFilters from trips.js in actions:
    dispatch(setFilters(appliedFilters));
  }, [isForFamilies, isForDisabled, hasWater, isUrban]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="for-families"
        state={isForFamilies}
        onChange={(newValue) => setIsForFamilies(newValue)}
      />
      <FilterSwitch
        label="for-disabled"
        state={isForDisabled}
        onChange={(newValue) => setIsForDisabled(newValue)}
      />
      <FilterSwitch
        label="has-water"
        state={hasWater}
        onChange={(newValue) => setHasWater(newValue)}
      />
      <FilterSwitch
        label="urban"
        state={isUrban}
        onChange={(newValue) => setIsUrban(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Trips",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // Add headerRight of save icon.
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          color="black"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
```
