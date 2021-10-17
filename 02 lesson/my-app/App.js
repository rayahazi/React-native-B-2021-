import React, {useState} from 'react';
import { StyleSheet,TextInput, Text, View } from 'react-native';

export default function App() {

  const [myName, setMyName] = useState("name...");

  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>Enter your name:</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(txt)=>setMyName(txt)}
        placeholder="Enter your name:"
        autoCapitalize="words"
        autoCompleteType="name"
        />

      <Text>
        Your name is: {myName}
      </Text>

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
  txt1:{
    fontSize:20
  },
  input:{
    borderColor:'gray',
    borderWidth:1,
    height:40,
    width:"50%"
  }
});