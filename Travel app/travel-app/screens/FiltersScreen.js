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
      backgroundColor: Colors.primary
    },
    headerTintColor: 'white',
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