import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderText = props => (
    <Text style={styles.body}>{props.children}</Text>
)

const styles = StyleSheet.create({
    body:{
        fontFamily:'reggae-one',
        fontSize:20
    }
})

export default HeaderText;