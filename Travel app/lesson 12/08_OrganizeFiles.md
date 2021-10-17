#### פה אנחנו רוצים ליצור קומפוננט שיהיה אחראי על כל בחירת מדינה ספציפית

#### פיצול מסכים

# 1. Pass renderGridItem function to other component:

Create new component: CountryGridTile.js

```js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CountryGridTile = (props) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        props.navigation.navigate({
          routeName: "CountryTrip",
          params: {
            countryId: itemData.item.id,
          },
        });
      }}
    >
      <View>
        <Text>{itemData.item.title}</Text>
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
  // Add style -> from the other screen(remove there)
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CountryGridTile;
```

# 2. in CountriesScreen.js

1. import
2. function to call the component
3. Add the data from onPress to onSelect.

> note: there will be an error still. (we must change in CountryGridTile.js file)

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
import Colors from "../constants/Colors";

// 1. Import:
import CountryGridTile from "../components/CountryGridTile";

const CountriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    console.log(itemData.item.title);
    return (
      // change to CountryGridTile:
      <CountryGridTile
        title={itemData.item.title}
        // Change to onSelect - it is a prop we create to pass the function to the component
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

# 3. CategoryGridTile.js

1. onPress
2. Text -> props

```js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// in Text -> change to props.title
const CountryGridTile = (props) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      // redirct to the function with the data
      onPress={props.onSelect}
    >
      <View>
        <Text>{props.title}</Text>
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
});

export default CountryGridTile;
```
