import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    Pressable
  } from 'react-native';
import {SYMFONY_URL} from '@env';
import axios from "axios";
import Loading from './Loading';


export default function Register({navigation}) {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        lastname: '',
        firstname: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const [invalid, setInvalid] = useState(false);

    const [invalidMessage, setInvalidMessage] = useState([]);

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
            setIsLoading(false);
            setInvalid(true);
            if(error.response.data.message=="Missing fields") {
                setInvalidMessage("Veuillez remplir tous les champs");
            }
            if(error.response.data.message=="Email already exists") {
                setInvalidMessage("Cet email est déjà utilisé");
            }
        });
    }
    
    if(isLoading) {
        <Loading message="Veuillez patientez..."/>
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style={{backgroundColor: "#756da7"}} />
            <View style={styles.header}>
                <Image source={require('../assets/LoginGoofy.png')} style={{width: 200, height: 200, marginBottom: 20}} />
                <Text style={styles.mainTitle}>Bienvenue sur Goofy Messenger</Text>
            </View>
            <View style={styles.body}>
                {invalid && <Text style={styles.invalid}>{invalidMessage}</Text>}
                <TextInput placeholder="Email" name="email" value={credentials.email} onChangeText={ e =>onChange(e,'email')} style={styles.input} placeholderTextColor="#1f2e7a" />
                <TextInput placeholder="Mot de passe" name="password" value={credentials.password} onChangeText={e =>onChange(e,"password")} style={styles.input} placeholderTextColor="#1f2e7a" />
                <TextInput placeholder="Nom" name="lastname" value={credentials.lastname} onChangeText={e =>onChange(e,"lastname")} style={styles.input} placeholderTextColor="#1f2e7a" />
                <TextInput placeholder="Prenom" name="firstname" value={credentials.firstname} onChangeText={e =>onChange(e,"firstname")} style={styles.input} placeholderTextColor="#1f2e7a" />
                <Pressable style={styles.button} onPress={onSubmit}>
                    <Text style={styles.text}>Inscription</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 800,   
        backgroundColor:"#756da7",
    },
    header: {
        flex: 0.4,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        color: '#1f2e7a',
    },
    title: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#1f2e7a',
    },
    mainTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#1f2e7a',
    },
    body: {
        flex: 0.6,
        // justifyContent: 'top',
        width: '100%',
        color: '#1f2e7a',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1f2e7a',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        color: '#bee6e6',
        // textAlign: 'center',
    },
    invalid: {
        color: 'red',
        textAlign: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1f2e7a",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    text: {
        color: '#bee6e6',
    }
    
});
