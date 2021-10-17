// unique identifier:
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

// 1. variable to hold filters.
export const SET_FILTERS = "SET_FILTERS";

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, tripId: id };
};

// 2. change / set data into SET_FILTERS
export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};
