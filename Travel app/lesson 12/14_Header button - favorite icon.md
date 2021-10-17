# 14_Header button

- https://reactnavigation.org/docs/4.x/header-buttons

### 1. In TripDetailScreen.js:

- if we add headerRight -> it will be in the right corner of our header.
- to make it fit to all screens:

```js
// Add navigation options object -> we can use the dynamic data.
TripDetailScreen.navigationOptions = (navigationData) => {
  const tripId = navigationData.navigation.getParam("tripId");
  const selectedTrip = TRIPS.find((trip) => trip.id === tripId);
  return {
    headerTitle: selectedTrip.title,
    headerRight: () => <Text>favorite</Text>,
  };
};
```

### 2. run:

```
> yarn add react-navigation-tabs
> npm install --save react-navigation-header-buttons

> npm install --save @expo/vector-icons

// or:
yarn add react-navigation-header-buttons
yarn add @expo/vector-icons
```

### 3. create HeaderButton in components:

```js
import React from "react";
// import from the package we installed
import { HeaderButton } from "react-navigation-header-buttons";
// import icons -> if not installed run: (npm i --save @expo/vector-icons)
import { Ionicons } from "@expo/vector-icons";

// HeaderButton from the package, it will receive all the props we will pass
// IconComponent - type of library of icons
const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color="white"
    />
  );
};

export default CustomHeaderButton;
```
