import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

export default function GameOverScreen(props) {
  return (
    <View style={styles.container}>
        <Text>GAME OVER!</Text>
        <Button title="Start a new game" onPress={() => props.onStartGame()} />
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
