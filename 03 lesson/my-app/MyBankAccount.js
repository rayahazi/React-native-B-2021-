import React from "react";
import {View, Text, StyleSheet} from "react-native";

const MyBankAccount = props => {
    return(
        <View>
            <Text style={styles.txt1}>Bank details</Text>
            <Text>{props.bankName}, {props.bankAccount} : {props.money} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    txt1:{
        fontSize:25,
        color:'gray'
    }
  });

export default MyBankAccount;