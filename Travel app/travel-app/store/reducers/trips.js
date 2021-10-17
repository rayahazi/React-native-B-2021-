import { TRIPS } from "../../data/dummy-data";
// 1. import:
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/trips";

const initialState = {
  trips: TRIPS,
  filteredTrips: TRIPS,
  favoriteTrips: [],
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteTrips.findIndex(
        (trip) => trip.id === action.tripId
      );
      if (existingIndex >= 0) {
        const updatedFavtrips = [...state.favoriteTrips];
        updatedFavtrips.splice(existingIndex, 1);
        return { ...state, favoriteTrips: updatedFavtrips };
      } else {
        const trip = state.trips.find((trip) => trip.id === action.tripId);
        return { ...state, favoriteTrips: state.favoriteTrips.concat(trip) };
      }
    // 2.SET_FILTERS:
    case SET_FILTERS:
      // extract filter from the actions:
      const appliedFilters = action.filters;
      // all trips available:
      // Example: if im looking for glutenFree trip, and !trip.isGlutenFree -> trip is not:
      // drop it from the list. same to all other options:
      const updatedFilteredTrips = state.trips.filter((trip) => {
        if (appliedFilters.glutenFree && !trip.isGlutenFree) return false;
        if (appliedFilters.lactoseFree && !trip.isLactoseFree) return false;
        if (appliedFilters.vegetarian && !trip.isVegetarian) return false;
        if (appliedFilters.vegan && !trip.isVegan) return false;
        // only if trip applies all filters:
        return true;
      });
      // return state to upadted array:
      return { ...state, filteredTrips: updatedFilteredTrips };
    default:
      return state;
  }
};

export default tripsReducer;