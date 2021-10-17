import React, {useState} from 'react';
// import Modal
import {View, StyleSheet, TextInput, Button, Modal} from 'react-native';

const GoalInput = props => {

    const [goal, setGoal] = useState("");

    return(
      <Modal visible={props.visible} animationType='none'>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="my new goal..."
            onChangeText={(txt)=>setGoal(txt)}
            />
            <View style={styles.btnContainer}>
              <View style={styles.btn}>
                <Button 
                title="Add"
                onPress={props.onAddGoal.bind(this, goal)}/>
              </View>
              <View style={styles.btn}>
                <Button 
                title="Cancel"
                onPress={props.onCancel}
                color="red"/>
              </View>
            </View>
        </View>
      </Modal>
    );
}


const styles = StyleSheet.create({
    inputContainer:{
      justifyContent:'center',
      alignItems:'center',
      flex:1
  },
  input:{
    borderColor:'black',
    borderWidth:1,
    width:'70%'
  },
  btn:{
    width:'50%',
  },
  btnContainer:{
    flexDirection:'row',
    width:'60%',
    margin:10,

  }
});

export default GoalInput;