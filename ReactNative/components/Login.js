
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
    Image,
    Pressable
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import Loading from './Loading';



export default function Login({navigation}) {

    
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [invalid, setInvalid] = useState(false);

    const [isLogging, setIsLogging] = useState(false);
    
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
        setIsLogging(true);
        axios(config)
        .then(function (response) {
            if (response.data.token) {
                setIsLogging(false);
                AsyncStorage.setItem('token', response.data.token);
                navigation.navigate('Home');
            }
        })
        .catch(function (error) {
            setIsLogging(false);
            if(error.response.data.message === "Invalid credentials.") {
                setInvalid(true);
            }
        });
            
        
        
      };

      // while is Logging whe display a loading screen named goofyGif
        if(isLogging) {
            return(
                <Loading message="Connexion en cours..."/>
            );
        }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/LoginGoofy.png')} style={{width: 200, height: 200, marginBottom: 20}} />
                <Text style={styles.mainTitle}>Bienvenue sur Goofy Messenger</Text>
                <Text style={styles.title}>Connectez-vous pour continuer</Text>
            </View>
            <View style={styles.body}>
                <TextInput placeholder="Email" name="username" value={credentials.username} onChangeText={e =>onChange(e,'username')} style={styles.input} />
                <TextInput placeholder="Mot de Passe" secureTextEntry={true} name="password" value={credentials.password} onChangeText={e =>onChange(e,"password")} style={styles.input}/>
                {invalid && <Text style={styles.invalid}>Mauvais identifiants</Text>}
                <Pressable style={styles.button} onPress={onSubmit}>
                    <Text style={styles.text}>Connexion</Text>
                </Pressable>
                <StatusBar/>
              
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                    <Text>Pas de compte ?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={{color: '#1f2e7a', fontWeight: 'bold'}}> S'inscrire</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>            
    );
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
