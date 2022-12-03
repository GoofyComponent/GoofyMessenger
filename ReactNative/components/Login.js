
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { ValidationOptions, FieldError } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import { AxiosRequestConfig } from 'axios';
import { Buffer } from 'buffer';


export default function Login(){

    
    const [credentials, setCredentials] = useState({
        username: 'amaya46@hotmail.com',
        password: 'password'
    });
    
    const onChange = (e,name) => {
        setCredentials({
            ...credentials,
            [name]: e
        })
    }
    
    const onSubmit = () => {

        var url = "http://172.20.10.2:8245/api/login";

        var config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(credentials)
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            
        
        
      };


    return(
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput placeholder="Email" name="username" value={credentials.username} onChangeText={e =>onChange(e,'username')} style={styles.input} />
            <TextInput placeholder="Password" name="password" value={credentials.password} onChangeText={e =>onChange(e,"password")} style={styles.input} />
            <Button title="Login" onPress={onSubmit} style={styles.button} />
            <Text>{credentials.username}</Text>
            <Text>{credentials.password}</Text>

            <StatusBar/>
        </View>            
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
    },
    button: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});
