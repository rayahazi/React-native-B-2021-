# Trips:

1. The screen we load when we select a country.

## 1. Create trip.js in Models:

```js
class Trip {
  constructor(
    id,
    countryIds,
    title,
    affordability, // affordable, priecy, luxurious
    complexity, // simple, challenging, trek
    imageUrl,
    duration,
    description,
    steps,
    // 4 boolean values (later will be used in filters page)
    isFamilyAvailable,
    isSuitableForDisabled,
    isWaterAccess,
    isUrban
  ) {
    this.id = id;
    this.countryIds = countryIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isFamilyAvailable = isFamilyAvailable;
    this.isSuitableForDisabled = isSuitableForDisabled;
    this.isWaterAccess = isWaterAccess;
    this.isUrban = isUrban;
  }
}

export default Trip;
```

## 2. Import to dummy-data:

```js
import Country from "../models/Country";

export const COUNTRIES = [
  new Country("c1", "Israel", "#f5428d"),
  new Country("c2", "Spain", "#f54242"),
  new Country("c3", "Iceland", "#f5a442"),
  new Country("c4", "Brazil", "#f5d142"),
  new Country("c5", "China", "#368dff"),
  new Country("c6", "USA", "#41d95d"),
  new Country("c7", "Norway", "#9eecff"),
  new Country("c8", "Russia", "#b9ffb0"),
  new Country("c9", "England", "#ffc7ff"),
  new Country("c10", "France", "#47fced"),
];

// import:
import Trip from "../models/Trip";

// add data for Trips:

export const TRIPS = [
  new Trip(
    "t1",
    ["c1"], // Array of countries id's
    "JERUSALEM DAY TOUR",
    "affordable",
    "simple",
    "https://media.audleytravel.com/-/media/images/home/north-africa-and-the-middle-east/israel/places/istock_691476048_jerusalem_letterbox.jpg?q=79&w=1920&h=640",
    "1 day",
    "Day tour in jerusalem city...",
    [
      `08:00 – Old City Tour`,
      `11:00 - Tour of Mount Zion`,
      `12:00 - Panoramic views of Jerusalem from the Haas Promenade`,
      `12:30 - Tour the First Station, the Israeli Parliament, the Rose Garden, and more`,
      `16:00 - Explore the Machane Yehuda Market`,
    ],
    true,
    true,
    false,
    true
  ),
  new Trip(
    "t2",
    ["c2"],
    "Canary Islands Walking - La Gomera and Tenerife",
    "priecy",
    "trek",
    "https://cdn.tourradar.com/s3/tour/1500x800/124760_a6b909f2.jpg",
    "8 days",
    "Start and end in San Miguel de Abona! With the Hiking & Trekking tour Canary Islands Walking - La Gomera and Tenerife, you have a 8 days tour package taking you through San Miguel de Abona, Spain and 5 other destinations in Spain. Canary Islands Walking - La Gomera and Tenerife includes accommodation in a hotel as well as an expert guide, meals, transport and more.    ",
    [
      "Day 1: Join trip in Los Cristianos, Tenerife; ferry to La Gomera Island",
      "Day 2: Walk from Vallehermoso to coastal town of Agulo",
      "Day 3: Explore the ancient cloud forest and ascend Alto de Garajonay",
      "Day 4: Descend to Chejelipes via La Laja village; free afternoon",
      "Day 5: Free day to relax or enjoy an optional walk",
      "Day 6: Walk to the black sand beach of Playa Caleta",
      "Day 7: Ferry back to Tenerife; circular walk on El Teide",
      "Day 8: Trip ends in San Miguel de Abona, Tenerife",
    ],
    false,
    false,
    true,
    false
  ),
];
```

## 3. Loading Trips for countries - CountryTripScreen.js:

```js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList,
} from "react-native";

// 1. import:
import { COUNTRIES, TRIPS } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CountryTripScreen = (props) => {
  const countryId = props.navigation.getParam("countryId");
  const selectedCountry = COUNTRIES.find((country) => country.id === countryId);

  // Add function to filter the id of each trip, to array:
  const displayedTrips = TRIPS.filter(
    (trip) => trip.countryId.indexOf(countryId) >= 0
  );

  // now we want to render a FlatList instead of a Butoon:
  // 1. remove all data inside the View.
  // 2. Import FlatList instead of Button
  // 3. the data in the list will be the array: displayedTrips

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

## 4. CountryTripScreen.js:

Create a function to show each item for list:

<img src="../IMG/6.PNG">

```js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList,
} from "react-native";

import { COUNTRIES, TRIPS } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CountryTripScreen = (props) => {
  const countryId = props.navigation.getParam("countryId");
  const selectedCountry = COUNTRIES.find((country) => country.id === countryId);

  // 1. Create the function that renders each data for the FlatList:
  const renderTripItem = (itemData) => {
    return (
      <View>
        <Text>{itemData.item.title}</Text>
      </View>
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
