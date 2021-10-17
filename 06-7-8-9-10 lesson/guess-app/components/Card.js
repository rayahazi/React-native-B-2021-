import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = props => {

    // ...styles.card - is the style in this file
    // ...props.style - additional style
    return(
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
}

// keep only the style that will be global for each card:
const styles = StyleSheet.create({
    card:{
        shadowColor:'black',
        shadowOffset:{height:2, width:0},
        shadowRadius: 6, // now we will see the shadow
        shadowOpacity:0.2, // 0-1
        borderRadius:5, // rounded corners
        elevation:6, // shadow settings for android
        padding:10,
        marginTop:10
    }
})

export default Card;