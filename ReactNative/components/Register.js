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
import {SYMFONY_URL} from '@env';
import axios from "axios";

export default function Register({navigation}) {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        lastname: '',
        firstname: ''
    });

    const onChange = (e,name) => {
        setCredentials({
            ...credentials,
            [name]: e
        })
    }

    const onSubmit = () => {



        var url = SYMFONY_URL+"/api/register";

        var config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: credentials   
        };
        axios(config)
        .then(function (response) {
            navigation.navigate('Login');
        })
        .catch(function (error) {
            if(error.data.message =="Une des valeurs est vide ou mal rentrée") {
                console.log("Une des valeurs est vide ou mal rentrée");
            }
        });
    }


    return(
        <View>
            <Text>Register</Text>
            <TextInput placeholder="Email" name="email" value={credentials.email} onChangeText={ e =>onChange(e,'email')} style={styles.input} />
            <TextInput placeholder="Mot de passe" name="password" value={credentials.password} onChangeText={e =>onChange(e,"password")} style={styles.input} />
            <TextInput placeholder="Nom" name="lastname" value={credentials.lastname} onChangeText={e =>onChange(e,"lastname")} style={styles.input} />
            <TextInput placeholder="Prenom" name="firstname" value={credentials.firstname} onChangeText={e =>onChange(e,"firstname")} style={styles.input} />
            <Button title="Inscription" onPress={onSubmit} style={styles.button} />
            <StatusBar/>
        </View>
    )
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