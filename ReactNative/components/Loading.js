import {
    View,
    Text,
    StyleSheet,
    Image
  } from 'react-native';
  import React from 'react';


export default function Loading({message}) {
    console.log(message)
    return(
        <View style={styles.container}>
            <Image source={require('../assets/goffyGIF.gif')} style={styles.image} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        maxWidth: 800,   
        backgroundColor:"#756da7",
        zIndex: 10,
    },
    text: {
        color: '#bee6e6',
        fontSize: 20,
        marginBottom:200
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        marginTop: '50%'
    }

});
