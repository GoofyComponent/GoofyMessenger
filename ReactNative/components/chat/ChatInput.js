// a simple input and a button to submit the message 

import React, { useState, useEffect, useRef, useContext } from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {SYMFONY_URL} from '@env';
import axios from "axios";
import  getJWT  from '../../utils/getJWT';

export default function ChatInput({idUserToChat ,store ,actions}) {
    const [newMessage, setNewMessage] = useState('');

    const [jwt, setJwt] = useState('');

    useEffect(() => {
        let jwtPromise = getJWT();
        jwtPromise.then((jwt) => {
            // if jwt undefined, redirect to login
            if(!jwt) {
                navigation.navigate('Login');
            }
            setJwt(jwt);
        });
    },);

    while(jwt === '') {
        return <Text>Loading...</Text>
    }

    const onSubmit = () => {
        let me = store.getState().message.me;
        // // store.getState().message.mesages is a json object
        let lastIndex = Object.keys(store.getState().message.messages).length;
        let date = new Date;
        let strDate = date.toLocaleString();
        // use addMessage reducer from store
        let array = {'index':lastIndex, 'toAdd':{ "author": me, "content": newMessage, "date": strDate}};
        store.dispatch(actions.addMessage(array));
        // on vide le champ
        setNewMessage('');

        var url = SYMFONY_URL+"/api/message/post/"+idUserToChat;

        var config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+jwt,
            },
            data: {message: newMessage}   
        };
        axios(config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
           console.log(error);
        });

    }
    // use App.js ChatContext
    return (
        // button into the input 
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={newMessage}
                    onChangeText={setNewMessage}
                    onSubmitEditing={onSubmit}
                />
                <Button title="Send" onPress={onSubmit} />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        paddingTop: 20,
        width: '100%',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal: 10,
    },

});