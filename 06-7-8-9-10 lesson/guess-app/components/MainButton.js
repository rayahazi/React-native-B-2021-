import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const MainButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:Colors.primary,
        borderRadius: 25, 
        paddingVertical: 12, // top + bottom
        paddingHorizontal: 30 // left + right
    },
    buttonText:{
        color:'white',
        fontFamily:'reggae-one',
        fontSize:18
    }
})

export default MainButton;