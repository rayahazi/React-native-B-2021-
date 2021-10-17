import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const GoalItem = props => {
    return(
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onDelete.bind(this, props.id)}>
        <View style={styles.listItem}>
            <Text>{props.title}</Text>
        </View>
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    listItem:{
      marginBottom: 5,
      backgroundColor: "whitesmoke",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 50,
      minWidth: "100%",
      borderRadius: 3,
    }
  });

export default GoalItem;