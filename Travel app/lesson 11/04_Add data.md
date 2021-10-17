# Add data:

- models/Country.js

```js
// Structure for each country in our app:
class Country {
  constructor(id, title, color) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}

export default Country;

/*
Class task:
1. Add to countriesScreen flatList with list of all countries. 

*/
```

- data/dummy-data.js

```js
import Country from "../models/Country";

export const COUNTRIES = [
  new Country("c1", "Israel", "darkcyan"),
  new Country("c2", "France", "coral"),
  new Country("c3", "Iceland", "darksalmon"),
  new Country("c4", "Brazil", "darkviolet"),
  new Country("c5", "Spain", "firebrick"),
  new Country("c6", "Norway", "gold"),
  new Country("c7", "USA", "green"),
  new Country("c8", "England", "lightpink"),
  new Country("c9", "China", "lightslategrey"),
  new Country("c10", "Ireland", "mediumorchid"),
];
```

- Add to flatList in `CountriesScreen.js`

```js
import React from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";

import { COUNTRIES } from "../data/dummy-data";

const renderGridItem = ({ item }) => {
  // console.log(itemData);
  return (
    <View style={styles.gridItem}>
      <Text>{item.title}</Text>
    </View>
  );
};

const CountriesScreen = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={COUNTRIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
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

