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