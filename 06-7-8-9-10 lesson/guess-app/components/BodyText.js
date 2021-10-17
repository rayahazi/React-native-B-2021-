import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BodyText = props => (
    <Text style={styles.body}>{props.children}</Text>
)

const styles = StyleSheet.create({
    body:{
        fontFamily:'reggae-one',
    }
})

export default BodyText;