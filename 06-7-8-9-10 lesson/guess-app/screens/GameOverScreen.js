import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import HeaderText from '../components/HeaderText'
import MainButton from '../components/MainButton'
import Colors from '../constants/Colors';

const GameOverScreen = props => {
    return(
        <View style={styles.container}>
            <HeaderText>GAME OVER!</HeaderText>

            <View style={styles.imageContainer}>
                <Image 
                // source={require('../assets/win.jpeg')}
                source = {{
                    uri:'https://www.findabusinessthat.com/blog/wp-content/uploads/2018/12/4e31f3d8575509930472e13c9d57b815.jpeg'
                }}
                fadeDuration={300}
                style={styles.image}/>
            </View>

            <Text style={styles.txt}>Number of rounds: {props.roundsNumber}</Text>
            <Text style={styles.txt}>Number was: {props.userNumber}</Text>
            <MainButton onPress={props.restart}>
                New game
            </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    // To get perfect cycle: height + width must be the same
    imageContainer:{
        width:300,
        height:300, 
        borderRadius:150, // half of height/width
        borderWidth:10,
        borderColor:Colors.primary,
        // any-child component that is bigger than that - will be removed
        overflow:'hidden',
        margin:30
    },
    image:{
        height:'100%',
        width:'100%',
    },
    txt:{
        fontSize:15, 
        margin: 10, 
        fontFamily:'reggae-one'
    }
})

export default GameOverScreen;