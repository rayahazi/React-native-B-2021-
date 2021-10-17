import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.container1}>
        <Text style={styles.txt1}>AlignItems - center</Text>
      </View>

      <View style={styles.container2}>
        <Text style={styles.txt1}>AlignItems - stretch (default)</Text>
      </View>

      <View style={styles.container3}>
        <Text style={styles.txt1}>AlignItems - flex-end (fit for hebrew)</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  },
  container1:{
    flex:1,
    backgroundColor:'pink',
    justifyContent:'center',
    alignItems:'center'
  },
  container2:{
    flex:1,
    backgroundColor:'powderblue',
    justifyContent:'center',
    alignItems:'stretch'


  },
  container3:{
    flex:1,
    backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'flex-end'


  },
  txt1:{
    fontSize:20,
  }

});
