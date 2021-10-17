import React from "react";
import {View, Text} from "react-native";

// MyName is a function. Functions can get parameters
const MyName = props => {
    return(
        <View>
            <Text>My full name is: {props.fname} {props.lname}</Text>
        </View>
    )
}

export default MyName;