# Redux in our app

### install:

2 packages:

```
npm install --save redux react-redux
```

### In our app:

1. Create folder `store`
2. in it -> create 2 folders: `actions` `reducers`.
3. in `reducers` create file `trips.js`

## 1. trips.js

```js
import { TRIPS } from "../../data/dummy-data";

/*
1. tripsReducer -> create without initial state. 
const tripsReducer = (state, action) => {
    return state;

2. create initialState: the first data. 
*/

const initialState = {
  trips: TRIPS, // Trips array
  filteredTrips: TRIPS, // no filters in the beginning
  favoriteTrips: [], // no favorites in the beginning
};

const tripsReducer = (state = initialState, action) => {
  return state;
};

export default tripsReducer;
```

## 2. in App.js

After that - we can use store anywhere in our project:

```js
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import TripsNavigator from "./navigation/TripsNavigation";

// 1. import:
// combineReducers - merges all reducers (in bigger apps we have more than 1)
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import tripsReducer from "./store/reducers/trips";

// 2: here we can put all the reducers we have:
const rootReducer = combineReducers({
  trips: tripsReducer,
});

// 3: create a store with rootReducer
const store = createStore(rootReducer);
const fetchFonts = () => {
  Font.loadAsync({
    "new-tegomin": require("./assets/fonts/NewTegomin-Regular.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.warn(error)}
      />
    );
  }

  // 4. wrap TripsNavigator with Provider
  return (
    <Provider store={store}>
      <TripsNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
```

## 3. Find all the places in our app where we use `TRIPS` array.

#### 1. In CountryTripScreen.js

```js
import React from "react";
import TripList from "../components/TripList";

// 1. Here we import TRIPS - so delete it, and use redux instead
//import { COUNTRIES, TRIPS } from '../data/dummy-data';
import { COUNTRIES } from "../data/dummy-data";

// 2. import:
import { useSelector } from "react-redux";
const CountryTripScreen = (props) => {
  const countryId = props.navigation.getParam("countryId");

  // 3. we will use this instead of `TRIPS`.
  // we want to get the filteredTrips (from initialState)
  const availableTrips = useSelector((state) => state.trips.filteredTrips);

  // change to availableTrips
  const displayedTrips = availableTrips.filter(
    (trip) => trip.countryIds.indexOf(countryId) >= 0
  );

  return <TripList listData={displayedTrips} navigation={props.navigation} />;
};

CountryTripScreen.navigationOptions = (navigationData) => {
  const countryId = navigationData.navigation.getParam("countryId");
  const selectedCountry = COUNTRIES.find((country) => country.id === countryId);

  return {
    headerTitle: selectedCountry.title,
  };
};

export default CountryTripScreen;
```

#### 2. in FavoritesScreen.js

```js
import React from "react";
import TripList from "../components/TripList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
// 1. remove:
//import { TRIPS } from "../data/dummy-data";
// 2. import:
import { useSelector } from "react-redux";

const FavoritesScreen = (props) => {
  // 3. change favTrips: to useSelector
  const favTrips = useSelector((state) => state.trips.favoriteTrips);

  return <TripList listData={favTrips} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: (
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
  };
};

export default FavoritesScreen;
```

#### 3. in TripDetailScreen.js

```js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// remove
// import { TRIPS } from "../data/dummy-data";
// 2. import:
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const TripDetailScreen = (props) => {
  // 3. Add arrray with all the availableTrips:
  const availableTrips = useSelector((state) => state.trips.trips);

  const tripId = props.navigation.getParam("tripId");

  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);

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

// 4. Problem: We cannot use useSelector inside a navigationOptions
// we can only use hooks inside another hooks or inside functional components.
// but this is a normal function:
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

#### 4. Solve problem of using useSelector in navigationOptions function

1. in components/TripList.js: send the title as params:

```js
const TripList = props => {
    const renderTripItem = (itemData) => {
        return <TripItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectTrip={() => {
          props.navigation.navigate({
            routeName: "TripDetail",
            params: {
              tripId: itemData.item.id,
               // Add:
               tripTitle: itemData.item.title
            },
          });
        }}/>
      };
```

2. in TripDetailScreen.js

```js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

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

  // change to availableTrips
  const selectedTrip = availableTrips.find((trip) => trip.id === tripId);

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

// 1. Solve problem:
// we can send the data as params from navigation.

TripDetailScreen.navigationOptions = (navigationData) => {
  const tripId = navigationData.navigation.getParam("tripId");
  //delete: const selectedTrip = TRIPS.find((trip) => trip.id === tripId);

  // Add: gets as param the title:
  const tripTitle = navigationData.navigation.getParam("tripTitle");

  return {
    // change to tripTitle
    headerTitle: tripTitle,
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
