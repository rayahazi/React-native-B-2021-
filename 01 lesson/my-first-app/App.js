import React, {useState} from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [outputText, setOutputText] = useState("Open up App.js to start working on your app!");

  // onClick - in react. onPress - in react native. 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{outputText}</Text>
      <Button title="Change my text" onPress={() => setOutputText("Hello students")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color:'black'
  }
});
