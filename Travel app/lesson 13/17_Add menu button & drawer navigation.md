# Add menu button & drawer navigation

## 1. TripsNavigator.js

install: `npm i @react-navigation/drawer` or `yarn add react-navigation-drawer`
`yarn add @react-navigation/native`

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

// import:
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

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
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoriteTripScreen,
    TripDetail: TripDetailScreen,
  },
  {
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

// Now is the time to use FiltersScreen
// 3. Create createStackNavigator
const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

// 2. Create drawer navigator:
const MainNavigator = createDrawerNavigator({
  tripsFavs: TripsFavTabNavigator,
  // 4. use FiltersNavigator as argument
  Filters: FiltersNavigator,
});

// 5. export the MainNavigator
export default createAppContainer(MainNavigator);
```

## 2. In filtersScreen.js

- Add header-title

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FiltersScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen!</Text>
    </View>
  );
};

// Add navigationOptions to FiltersScreen
FiltersScreen.navigationOptions = {
  headerTitle: "Filter Trips",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FiltersScreen;
```

## 3. Show the navigator in our app (not automatic) -> CountriesScreen.js

```js
import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { COUNTRIES } from "../data/dummy-data";
import CountryGridTile from "../components/CountryGridTile";
// 2. Import:
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
const CountriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CountryGridTile
        title={itemData.item.title}
        // 2. Add color ref:
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CountryTrip",
            params: {
              countryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={COUNTRIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CountriesScreen.navigationOptions = {
  headerTitle: "Trip countries",
  headerLeft: (
    // HeaderButton is the component we created before for design:
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        // we can define diffrent icons for android an ios by Platform
        iconName="ios-menu"
        onPress={() => {}}
      />
    </HeaderButtons>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CountriesScreen;
```

## 4. In CountriesScreen.js

change to function and open the side menu

```js
// 1. Change the navigationOptions to function, so we can return values:
CountriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Trip countries",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          // 2. Add function: open the side menu: we see TripsFav and Filters
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
```

## 5. Add to FavoritesScreen.js side menu too:

```js
import React from "react";
import { View, Text } from "react-native";
import TripList from "../components/TripList";
import { TRIPS } from "../data/dummy-data";

// import: -> make sure all the imports are here:
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const FavoritesScreen = (props) => {
  const favTrips = TRIPS.filter((trip) => trip.id === "t1" || trip.id === "t2");
  return <TripList listData={favTrips} navigation={props.navigation} />;
};

// Here we add also to facoriteScreen the side menu
// 1. Copy from countriesScreen.js
// 2. Change name to FavoritesScreen
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

## 6. Add side menu to FiltersScreen.js too:

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// 2. import:
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const FiltersScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen!</Text>
    </View>
  );
};

// 1. Add menu side to also FiltersScreen
FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Trips",
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FiltersScreen;
```

## 7. Styling -> in TripsNavigator.js

- Change title
- change color and font-family

```js
const MainNavigator = createDrawerNavigator(
  {
    tripsFavs: {
      screen: TripsFavTabNavigator,
      navigationOptions: {
        // Change title name
        drawerLabel: "Trips",
      },
    },
    Filters: FiltersNavigator,
  },
  // We can add third argument that defines the navigator itself:
  // Change the entire font-family and color
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        // Change font-family
        fontFamily: "pattaya-regular",
      },
    },
  }
);
```
