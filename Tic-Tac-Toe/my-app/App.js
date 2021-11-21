import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import GameBoardScreen from './screens/GameBoardScreen';
import GameOverScreen from './screens/GameOverScreen';
import StartGameScreen from './screens/StartGameScreen';


export default function App() {

  const [startGame, setstartGame] = useState(false);

  

  let startGameHandler = () =>{
    setstartGame(true);
  }

  let gameOverHandler = () =>{
    content = <GameOverScreen/>
  }
  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if(startGame) content = <GameBoardScreen onGameOver={gameOverHandler}/>


  return (
    <View style={styles.container}>
      <Header headerTxt="Tic Tac Toe"/>
      {content}
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
