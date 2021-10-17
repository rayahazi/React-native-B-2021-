import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import HeaderText from './HeaderText';

const Header = props => {
    return(
        <View style={styles.header}>
            <HeaderText style={styles.headerTxt}>{props.headerTxt}</HeaderText>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        height:80,
        width:'100%',
        backgroundColor: Colors.primary,
        alignItems:'center',
        justifyContent:'center',
        
    },
    
})

export default Header;