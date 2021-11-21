import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

export default function StartGameScreen(props) {
  return (
    <View style={styles.container}>
      <Button title="Start the game" onPress={() => props.onStartGame()} />
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
