# Colors:

in CountriesScreen.js -> Add color reference:

```js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";

import { COUNTRIES } from "../data/dummy-data";
import CountryGridTile from "../components/CountryGridTile";
// 1. Import:
import Colors from "../constants/Colors";

const CountriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    console.log(itemData.item.title);
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

## Add style: CountryGridTile.js

1. container
2. text

> note: about the weird border when pressing -> it specific to android, and we won't go into it now.. (we can change it by adding View wrapping and check for platform -> diffrent Touchable)

```js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const CountryGridTile = (props) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
      {/* 1. Add style - view and text */}
      <View
        style={{ ...styles.container, ...{ backgroundColor: props.color } }}
      >
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },

  // 2. Add style to container:
  container: {
    flex: 1,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3, // for android
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  // 3. Add style to title:
  title: {
    fontFamily: "pattaya-regular",
    fontSize: 22,
    margin: 10,
  },
});

export default CountryGridTile;
```
