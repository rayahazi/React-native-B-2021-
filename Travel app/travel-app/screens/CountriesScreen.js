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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CountriesScreen;