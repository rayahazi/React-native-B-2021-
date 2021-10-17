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