import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const NumberContainer = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        borderWidth:2, 
        borderColor: Colors.primary,
        borderRadius:10, 
        textAlign:'center',
        justifyContent:'center', 
        padding:10,
        margin:10
    },
    number:{
        color: Colors.secondary, 
        fontSize:22
    }
})

export default NumberContainer;