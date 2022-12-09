
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import {SYMFONY_URL} from '@env'




export default function Login({navigation}) {

    
    const [credentials, setCredentials] = useState({
        username: 'lorenza.schultz@hotmail.com',
        password: 'password'
    });

    const [invalid, setInvalid] = useState(false);
    
    const onChange = (e,name) => {
        setCredentials({
            ...credentials,
            [name]: e
        })
    }
    
    const onSubmit = () => {

        var url = SYMFONY_URL+"/api/login";

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
            if (response.data.token) {
                AsyncStorage.setItem('token', response.data.token);
                navigation.navigate('Home');
            }
        })
        .catch(function (error) {
            if(error.data.message === "Invalid credentials") {
                setInvalid(true);
            }
        });
            
        
        
      };


    return(
        <View style={styles.container}>
            <Text>Login</Text>
            {invalid && <Text style={styles.invalid}>Invalid Credentials</Text>}
            <TextInput placeholder="Email" name="username" value={credentials.username} onChangeText={e =>onChange(e,'username')} style={styles.input} />
            <TextInput placeholder="Password"secureTextEntry={true} name="password" value={credentials.password} onChangeText={e =>onChange(e,"password")} style={styles.input} />
            <Button title="Connexion" onPress={onSubmit} style={styles.button} />
            <StatusBar/>
            {/*  Pas de compte ? En créer un*/}
            <Text>Pas de compte ?</Text>
            <Button title="S'inscrire" onPress={() => navigation.navigate('Register')} />
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
