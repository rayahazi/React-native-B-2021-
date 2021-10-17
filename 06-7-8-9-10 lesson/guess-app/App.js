import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
// Import:
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () =>{
  return Font.loadAsync({
    "reggae-one": require('./assets/fonts/ReggaeOne-Regular.ttf')
  })
}


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  // we can use state to check if data has loaded:
  const [dataLoaded, setDataLoaded] = useState(false);


  // as long as data isn't loaded -> app is loading
  /* * startAsync: is a prop that gets the operation to execute. 
       A. it has to be a function B. it has to return a promise. 
     * onFinish: when startAsync is donw - go to it. (function)
     * onError - in case loading failed 
  */
  if(!dataLoaded){
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log(err)}/>
    )
  }


  const newGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (numberFromUser) => {
    setUserNumber(numberFromUser);
    setGuessRounds(0);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if(userNumber && guessRounds === 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if(guessRounds > 0){
    content = <GameOverScreen
                 userNumber={userNumber}
                roundsNumber={guessRounds}
                restart={newGameHandler} />;
  }

  return (
    <View style={styles.container}>
      <Header headerTxt="Guess my number" />
      {content}
      {/* <GameOverScreen/> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
