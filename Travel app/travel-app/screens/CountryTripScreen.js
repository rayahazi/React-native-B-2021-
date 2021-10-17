import React from "react";
import TripList from "../components/TripList";

// 1. Here we import TRIPS - so delete it, and use redux instead
//import { COUNTRIES, TRIPS } from '../data/dummy-data';
import { COUNTRIES } from "../data/dummy-data";

// 2. import:
import { useSelector } from "react-redux";

const CountryTripScreen = (props) => {
  const countryId = props.navigation.getParam("countryId");

  // 3. we will use this instead of `TRIPS`.
  // we want to get the filteredTrips (from initialState)
  const availableTrips = useSelector((state) => state.trips.filteredTrips);

  // change to availableTrips
  const displayedTrips = availableTrips.filter(
    (trip) => trip.countryIds.indexOf(countryId) >= 0
  );

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