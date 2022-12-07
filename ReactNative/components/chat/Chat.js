import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
    Button,KeyboardAvoidingView
  } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import  getJWT from '../../utils/getJWT';

import ChatContent from './ChatContent';
import ChatInput from './ChatInput';



export default function Chat({ route, navigation }) {
    // console.log(user);

    const [user, setUser] = useState(route.params['user']);
    const [message, setMessage] = useState([]);

    

    if(user.lastMessage) {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
            chatContent: {
                flex: 0.7,
                width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
            chatInput: {
                flex: 0.3,
                width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });
        useEffect(() => {
            let jwtPromise = getJWT();
            jwtPromise.then((jwt) => {
                // if jwt undefined, redirect to login
                if(!jwt) {
                    navigation.navigate('Login');
                }
                var url = SYMFONY_URL + "/api/get/conversation";
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + jwt,
                        'Content-Type': 'multipart/form-data'
                    },
                };
                let id = user.id;
                // to int
                id = parseInt(id);
                axios.post(url, {id: id}, config)
                .then(function (response) {
                    let messages = response.data.conversation;
                    // messages to array
                    // messages = Object.values(messages);
                    setMessage(messages);
                    
                })
                .catch(function (error) {
                    if(error.response.data.message === "Expired JWT Token") {
                        navigation.navigate('Login');
                    }
                    if(error.response.data.message === "Invalid JWT Token") {
                        navigation.navigate('Login');
                    }
                    console.log(error);
                });
                
            });
        }, []);
        
        return (
            <View style={styles.container}>
                <ChatContent messages={message} style={styles.chatContent} />
                <ChatInput user={user} style={styles.chatInput} />
            </View>
        );
    }
    // Le chat input doit etre en bas d'une certaine taille et le chat content doit etre en haut d'une certaine taille

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            // align bottom
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        chatContent: {
            flex: 0.9,
            width: '100%',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        chatInput: {
            flex: 0.1,
            width: '100%',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <ChatContent messages={message} style={styles.chatContent} />
            <ChatInput user={user} style={styles.chatInput} />
        </View>
    );
    
}


