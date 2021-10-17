# Functionality - forward trip to full details:

## 1. CountryTripScreen.js -> add onSelectTrip

```js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { COUNTRIES, TRIPS } from "../data/dummy-data";
import TripItem from "../components/TripItem";

const CountryTripScreen = (props) => {
  const countryId = props.navigation.getParam("countryId");
  const selectedCountry = COUNTRIES.find((country) => country.id === countryId);

  const renderTripItem = (itemData) => {
    return (
      <TripItem
        title={itemData.item.title}
        onSelectTrip={() => {
          props.navigation.navigate({
            routeName: "TripDetail",
            params: {
              tripId: itemData.item.id,
            },
          });
        }}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
      />
    );
  };

  const displayedTrips = TRIPS.filter(
    (trip) => trip.countryIds.indexOf(countryId) >= 0
  );
  console.log(displayedTrips);
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedTrips}
        keyExtractor={(item, index) => item.id}
        renderItem={renderTripItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

CountryTripScreen.navigationOptions = (navigationData) => {
  const countryId = navigationData.navigation.getParam("countryId");
  const selectedCountry = COUNTRIES.find((country) => country.id === countryId);

  return {
    headerTitle: selectedCountry.title,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CountryTripScreen;
```

## 2. TripDetailScreen.js

```js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import:
import { TRIPS } from "../data/dummy-data";

const TripDetailScreen = (props) => {
  // store tripId from CountryTripScreen:
  const tripId = props.navigation.getParam("tripId");

  // find all data for tripId:
  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);
  return (
    <View style={styles.container}>
      {/* Change to dynamic text */}
      <Text>{selectedTrip.title}</Text>
      <Button
        title=" go back to countries"
        onPress={() => props.navigation.popToTop()}
      />
    </View>
  );
};

// Add navigation options object -> we can use the dynamic data.
TripDetailScreen.navigationOptions = (navigationData) => {
  const tripId = navigationData.navigation.getParam("tripId");
  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);
  return {
    headerTitle: selectedTrip.title,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TripDetailScreen;
```
