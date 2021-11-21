import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: "100%",
    backgroundColor: "mediumseagreen",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    color: "black",
    fontSize: 25,
  },
});

export default Header;