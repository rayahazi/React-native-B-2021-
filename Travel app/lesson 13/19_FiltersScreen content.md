# 19_FiltersScreen content

## 1. Basic switch in FiltersScreen.js

```js
import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

// 4
import Colors from "../constants/Colors";

// 1. import useState
// 2. Add isForFamilies boolean state
// 3. Add value and onValueChange -> Now we can change the switch
// 4. import Colors
// 5. use with trackCtrackColor that gets object as paramenter
// 6. Add thumbColor
// 7. Now we can copy and paste the switch for all other parameters.
// But it is repetition of Code we better avoid.

const FiltersScreen = (props) => {
  // 2
  const [isForFamilies, setIsForFamilies] = useState(false);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <Text>For families</Text>
      <Switch
        value={isForFamilies}
        onValueChange={(newValue) => setIsForFamilies(newValue)}
        // if true - set to primary color
        trackCtrackColor={{ true: Colors.primaryColor }}
        // color of thumb:
        thumbColor={Colors.primaryColor}
      />
    </View>
  );
};

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
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
```

## 3. Duplicate to all other parameters with diffrent function:

```js
import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/Colors";

// 1. Function to return Switch:
// 2. Add 4 FilterSwitch items:
// 3. Add 4 states:

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  // 2
  const [isForFamilies, setIsForFamilies] = useState(false);
  const [isForDisabled, setIsForDisabled] = useState(false);
  const [hasWater, setHasWater] = useState(false);
  const [isUrban, setIsUrban] = useState(false);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="for-families"
        state={isForFamilies}
        onChange={(newValue) => setIsForFamilies(newValue)}
      />
      <FilterSwitch
        label="for-disabled"
        state={isForDisabled}
        onChange={(newValue) => setIsForDisabled(newValue)}
      />
      <FilterSwitch
        label="has-water"
        state={hasWater}
        onChange={(newValue) => setHasWater(newValue)}
      />
      <FilterSwitch
        label="urban"
        state={isUrban}
        onChange={(newValue) => setIsUrban(newValue)}
      />
    </View>
  );
};

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
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
```

## 4. Add button to save filters:

1. use useEffect and useCallback
2. Add button on headerRight

```js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

// 1. import  useEffect, useCallback
// 2. Add headerRight, with empty onPress.
// 3. Create `saveFilters` function that will hold the filters the user does,
// Also will print every running time to console, and will be updated depending on dependencies
// 4. Add useEffect -> keeps the result in params.
// 5. Add data to onPress of headerRight
// 6. see in console after change.

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary }}
        thumbColor={Platform.OS === "android" ? Colors.primary : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  // 2
  const [isForFamilies, setIsForFamilies] = useState(false);
  const [isForDisabled, setIsForDisabled] = useState(false);
  const [hasWater, setHasWater] = useState(false);
  const [isUrban, setIsUrban] = useState(false);

  const saveFilters = useCallback(() => {
    // Data to store:
    const appliedFilters = {
      forFamilies: isForFamilies,
      forDisabled: isForDisabled,
      hasWater: hasWater,
      isUrban: isUrban,
    };
    // print to console so we can see the result:
    console.log(appliedFilters);
    // dependencies: when they change - the function updates
  }, [isForFamilies, isForDisabled, hasWater, isUrban]);

  // useEffect() function will run After  the current render cycle.
  // in the end of cycle

  useEffect(() => {
    // save - can be any name. we will use it later.
    props.navigation.setParams({ save: saveFilters });
    // dependencies: when it changes -> update.
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="for-families"
        state={isForFamilies}
        onChange={(newValue) => setIsForFamilies(newValue)}
      />
      <FilterSwitch
        label="for-disabled"
        state={isForDisabled}
        onChange={(newValue) => setIsForDisabled(newValue)}
      />
      <FilterSwitch
        label="has-water"
        state={hasWater}
        onChange={(newValue) => setHasWater(newValue)}
      />
      <FilterSwitch
        label="urban"
        state={isUrban}
        onChange={(newValue) => setIsUrban(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Trips",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
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
    // Add headerRight of save icon.
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
```
