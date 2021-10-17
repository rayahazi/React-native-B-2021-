import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

// 2. add style. -> numberOfLines={1} if text is large - make is shorter. (only 1 row)

const TripItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelectTrip}>
      <View style={styles.tripItem}>
        <View style={{ ...styles.tripRow, ...styles.tripHeader }}>
          <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.tripRow, ...styles.tripDetail }}>
          <Text>{props.duration}</Text>
          <Text>{props.complexity.toUpperCase()}</Text>
          <Text>{props.affordability.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tripItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  tripRow: {
    flexDirection: "row",
  },
  tripHeader: {
    height: "85%",
  },
  tripDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  // Add style to title:
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)", // black color, bit transparent (0.5)
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "pattaya-regular",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default TripItem;