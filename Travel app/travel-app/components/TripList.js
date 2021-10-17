import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TripItem from "./TripItem";

const TripList = props => {
  const renderTripItem = (itemData) => {
      return <TripItem
      title={itemData.item.title}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      image={itemData.item.imageUrl}
      onSelectTrip={() => {
        props.navigation.navigate({
          routeName: "TripDetail",
          params: {
            tripId: itemData.item.id,
             // Add:
             tripTitle: itemData.item.title
          },
        });
      }}/>
    };
  return (
    <View style={styles.container}>
      <FlatList
        //   change the data from props.
        data={props.listData}
        keyExtractor={(item) => item.id}
        renderItem={renderTripItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default TripList;