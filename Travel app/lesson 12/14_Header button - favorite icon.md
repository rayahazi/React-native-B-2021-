# 14_Header button

### 1. In navigator

* Import Text
* * Add headerRight
```js
 <Stack.Screen 
        name="TripDetail" 
        component={TripDetailScreen}
        // Add:
        options={({ route }) => ({ title: route.params.tripName })
        , {headerRight: () => <Text>favorite</Text>}}
        />
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
