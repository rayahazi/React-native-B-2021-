# in CountriesScreen.js

- Add TouchableOpacity for each country
- Add navigation & navigationOptions

```js
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

import { COUNTRIES } from "../data/dummy-data";

const CountriesScreen = (props) => {
  const renderGridItem = ({ item }) => {
    // console.log(itemData);
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate({
            routeName: "CountryTrip",
            params: {
              countryId: item.id,
            },
          });
        }}
      >
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={COUNTRIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

// Define page header:
CountriesScreen.navigationOptions = {
  headerTitle: "Trip countries",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CountriesScreen;
```

## Add colors - `constants/Colors.js`

```js
export default {
  primary: "mediumseagreen",
  secondary: "seagreen",
};
```

- Add diffrent style according to the Platform:

> Note: import Platfrom from react-native.

```js
// Define page header:
CountriesScreen.navigationOptions = {
  headerTitle: "Trip countries",
  headerStyle: {
    backgroundColor: Platform.os === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.os === "android" ? "" : Colors.primary,
};
```
