import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
    Button,
  } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import  getJWT from '../../utils/getJWT';



export default function Chat({ route, navigation }) {
    // console.log(user);

    const [user, setUser] = useState(Object.values(route.params)[0]);
    const [message, setMessage] = useState([]);

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
                console.log(messages);
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


    if(user.lastmessage) {
    }

    return (
        <View>
            <Text>Chat</Text>
        </View>
    );
}
