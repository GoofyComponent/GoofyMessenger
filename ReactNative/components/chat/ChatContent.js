import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
    Button,
    FlatList,
  } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import { StatusBar } from 'expo-status-bar';


export default function ChatContent({messages}) {
    let me = messages.me;
    let other = messages.other;
    let Allmessages = messages.messages;
    if(Allmessages) {
        Allmessages = Object.values(Allmessages);
        // flatlist 
        return(
            <View style={styles.container}>
                <FlatList
                    inverted = {false}
                    data={Allmessages}
                    renderItem={({item, index}) => {
                       return(
                            <View style={styles.message} key={index}>
                                <Text>{item.content}</Text>
                            </View>
                          )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    message: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
});

