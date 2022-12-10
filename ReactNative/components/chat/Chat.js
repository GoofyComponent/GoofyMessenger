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
import { useState, useEffect,useRef } from 'react';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import  getJWT from '../../utils/getJWT';

import ChatContent from './ChatContent';
import ChatInput from './ChatInput';

import { createSlice, configureStore } from '@reduxjs/toolkit'


export default function Chat({ route, navigation }) {
    // console.log(user);

    const [user, setUser] = useState(route.params['user']);
    const [message, setMessage] = useState([]);
    useEffect(() => {
        let jwtPromise = getJWT();
        jwtPromise.then((jwt) => {
            if(!jwt) {
                navigation.navigate('Login');
            }
            var url = SYMFONY_URL + "/api/message/get/"+ user.id;
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                },
            };
            // to int
            let id = parseInt(user.id);
            axios.get(url, config)
            .then(function (response) {
                let messages = response.data;
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

    if(message.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }else {

        const messageSlice = createSlice({
            name: 'message',
            initialState: {
                message: message
            },
            reducers: {
                addMessage: (state, payload) => {
                    // dans le store on ajoute le message dans store.message
                    if (state.message.messages) {
                        let index = payload.payload.index;
                        let message = payload.payload.toAdd;
                        state.message.messages[index] = message;
                    }
                    
                }
            }
        });

        const store = configureStore({
            reducer: messageSlice.reducer
        });
        return (
            <View style={styles.container}>
                {/* en ref on mets user.id */}
                <ChatContent store={store} style={styles.chatContent} />
                <ChatInput idUserToChat={user.id} style={styles.chatInput} store={store} actions={messageSlice.actions} />
            </View>
        );
    }
    // Le chat input doit etre en bas d'une certaine taille et le chat content doit etre en haut d'une certaine taille

   

    // return (
    //     <View style={styles.container}>
    //         <ChatContent messages={message} style={styles.chatContent} />
    //         <ChatInput user={user} style={styles.chatInput} />
    //     </View>
    // );
    
}


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


