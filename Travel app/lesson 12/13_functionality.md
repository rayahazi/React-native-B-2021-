# Functionality - forward trip to full details:

## 1. CountryTripScreen.js -> add onSelectTrip

```js
import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import { COUNTRIES, TRIPS } from "../data/dummy-data";
// 1. import:
import TripItem from "../components/TripItem";

export default function CountryTripScreen({ route, navigation }) {
  const { countryId } = route.params;
  const displayedTrips = TRIPS.filter(
    (trip) => trip.countryIds.indexOf(countryId) >= 0
  );

  // 2. 
  const renderTripItem = ({item}) => {
    return (
      <TripItem
        title={item.title}
        onSelectTrip={() => {}}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
        // Add
        onSelectTrip={() => {
          navigation.navigate("TripDetail",{tripId: item.id, tripName: item.title});
        }}
      />    );
  };
  
  return (
    <View style={styles.container}>
      {/*  3.  */}
      <FlatList
        data={displayedTrips}
        keyExtractor={(item, index) => item.id}
        renderItem={renderTripItem}
        style={{ width: "100%" }}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## 2. TripDetailScreen.js

```js
import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
// import:
import { TRIPS } from "../data/dummy-data";

export default function TripDetailScreen({ navigation, route }) {
  
  // store tripId from CountryTripScreen:
  const { tripId } = route.params;
  // find all data for tripId:
  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);

  return (
    <View style={styles.container}>
     {/* Change to dynamic text */}
     <Text>{selectedTrip.title}</Text>
      <Button
        title=" go back to countries"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

## 3. navigator: 
```js
<Stack.Screen 
        name="TripDetail" 
        component={TripDetailScreen}
        // Add:
        options={({ route }) => ({ title: route.params.tripName })}
        />

```
