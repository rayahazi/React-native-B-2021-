# Favorite stack:
## 1. Set in MealsNavigator.js

```js
import React from "react";
import { Platform } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import CountriesScreen from "../screens/CountriesScreen";
import CountryTripScreen from "../screens/CountryTripScreen";
import TripDetailScreen from "../screens/TripDetailScreen";
import FavoriteTripScreen from "../screens/FavoriteTripScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

// 3. Define in variable instead in 2 places:
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};

const TripsNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    CountryTrip: {
      screen: CountryTripScreen,
    },
    TripDetail: TripDetailScreen,
  },
  {
    // 4. change to defaultStackNavOptions
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// 1. Add:
// 2. Note: we can use twice with TripDetailScreen (also above).
const FavNavigator = createStackNavigator(
  {
    Favorites: FavoriteTripScreen,
    TripDetail: TripDetailScreen,
  },
  {
    // 5. use also here in defaultStackNavOptions
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const TripsFavTabNavigator = createBottomTabNavigator(
  {
    Trips: {
      screen: TripsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="trail-sign-outline"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      // 6. change screen to FavNavigator
      screen: FavNavigator,
      navigationOptions: {
        tabBarLabel: "Favorites!",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
    },
  }
);
//export default createAppContainer(MealsNavigator);
// return this instead - leads also to the stack navigator.
export default createAppContainer(TripsFavTabNavigator);
```

<img src="../IMG/10.PNG">

## 2. in FavoriteTripScreen.js

1. Change header.
2. clear code

```js
// Here
import React from "react";
import { View, Text } from "react-native";

const FavoriteTripScreen = (props) => {
  return (
    <View>
      <Text>Favorite Trip screen</Text>
    </View>
  );
};

// 1. Change header to 'Your Favorites'
FavoriteTripScreen.navigationOptions = {
  headerTitle: "Your Favorites",
};

export default FavoriteTripScreen;
```

# 3. Output FlatList to separate component:

Why ? We want to use the FlatList element also in the **FavoriteTripScreen.js** file too.

1. In CountryTripScreen - remove FlatList:
2. Create `TripList.js` in components folder:

### In CountryTripScreen.js:

remove all things that go to other file:

```js
import React from "react";
import { COUNTRIES, TRIPS } from "../data/dummy-data";

// import:
import TripList from "../components/TripList";

const CountryTripScreen = (props) => {
  const countryId = props.navigation.getParam("countryId");
  const displayedTrips = TRIPS.filter(
    (trip) => trip.countryIds.indexOf(countryId) >= 0
  );

  // return this instead:
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

##### In TripList.js:

```js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TripItem from "./TripItem";

const TripList = (props) => {
  const renderTripItem = (itemData) => {
    return (
      <TripItem
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
            },
          });
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        //   change the data from props.
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderTripItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default TripList;
```

## 4. Use the FlatList in FavoriteScreen

```js
import React from "react";
import { View, Text } from "react-native";
// import:
import TripList from "../components/TripList";
import { TRIPS } from "../data/dummy-data";

const FavoriteTripScreen = (props) => {
  // Add dummy favorites: just to see if works:
  const favTrips = TRIPS.filter((trip) => trip.id === "t1" || trip.id === "t2");
  return <TripList listData={favTrips} navigation={props.navigation} />;
};

FavoriteTripScreen.navigationOptions = {
  headerTitle: "Your Favorites",
};

export default FavoriteTripScreen;
```

<img src="../IMG/10a.PNG">