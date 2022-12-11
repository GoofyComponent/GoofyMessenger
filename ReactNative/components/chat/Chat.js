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
import {MERCURE_URL} from '@env'

import  getJWT from '../../utils/getJWT';

import ChatContent from './ChatContent';
import ChatInput from './ChatInput';

import { createSlice, configureStore } from '@reduxjs/toolkit';
import RNEventSource from 'react-native-event-source';

import Loading from '../Loading';




export default function Chat({ route, navigation }) {
    // console.log(user);

    const [user, setUser] = useState(route.params['user']);
    const mercureJwt = route.params['mercureJwt'];
    const [message, setMessage] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // const eventSource = route.params['eventSource'];
    // on ouvre un nouvel eventSource
    // on ferme l'eventSource
    // navigation.setOptions({ title: user.lastname + " " + user.firstname });
    
    useEffect(() => {
        let jwtPromise = getJWT();
        setIsFetching(true);
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
                setIsFetching(false);
                
            })
            .catch(function (error) {
                console.log('error', error);
                if(error.response.data.message === "Expired JWT Token") {
                    navigation.navigate('Login');
                }
                if(error.response.data.message === "Invalid JWT Token") {
                    navigation.navigate('Login');
                }
                setIsFetching(false);
            });
            
        });
    }, []);

    if(isFetching) {
        return (
            <Loading message="Chargements de vos messages..."/>
        )
    }

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
    const url = MERCURE_URL+"?topic=https://example.com/my-private-topic";
    // create event source
    const eventSource = new RNEventSource(url, {
        headers: {
            Authorization: 'Bearer ' + mercureJwt,
        },
    });


    // open event source
    eventSource.addEventListener('open', () => {
    });
    // // on message event
    eventSource.addEventListener('message', (event) => {
        console.log('message', event);
        let data = JSON.parse(event.data);
        // on remove idUser
        let idUser = data.idUser;
        delete data.idUser;
        // get last index of message in store
       // type of store.getState().message.messages
        if (store.getState().message.messages) {
            var index = store.getState().message.messages.length;
            store.dispatch(messageSlice.actions.addMessage({index: index, toAdd: data}));
            console.log("on ajoute le message dans le store")
        }
    });

    eventSource.addEventListener('error', (event) => {
        console.log('error', event);
    });

    eventSource.addEventListener('close', () => {
        console.log('close');
    });

    return (
        <View style={styles.container}>
            {/* en ref on mets user.id */}
            <ChatContent store={store} style={styles.chatContent} />
            <ChatInput idUserToChat={user.id} style={styles.chatInput} store={store} actions={messageSlice.actions} />
        </View>
    );

    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // align bottom
        alignItems: 'center',
        // justifyContent: 'flex-end',
    },
    chatContent: {
        flex: 0.9,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    chatInput: {
        flex: 0.1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});


