# TripDetailScreen content

- We want to add data from dumm-data to each trip screen:

  <img src="../IMG/13.PNG">

## TripDetailScreen.js

```js
import React from "react";
// add:
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { TRIPS } from "../data/dummy-data";

// 1. import
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

// 2. create a function that will show each item in the list
const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const TripDetailScreen = (props) => {
  const tripId = props.navigation.getParam("tripId");

  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);
  // 1. Import scrollView so data can be rolled (there is a lot of data).
  // 2. Wrap all returned data in scrollView
  // 3. import Image, and add Image component at the top:
  // 4. copy the TripItem view with text of duration, complexity and affordability
  // 8. change props to selectedTrip
  // 5. Add text with Description, and style it.
  // 6. Add the list of Description by map() function - Add to list
  // 7. Add steps by map() function - Add to list
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
  const tripId = navigationData.navigation.getParam("tripId");
  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);
  return {
    headerTitle: selectedTrip.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log("Mark as favorite!");
          }}
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
