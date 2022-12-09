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
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import {SYMFONY_URL} from '@env'

export default function Register({navigation}) {

    const [credentials, setCredentials] = useState({
        Email: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('')

    const [invalid, setInvalid] = useState(false);
    const [emailNotValid, setEmailNotValid] = useState(false);
    const [firstnameNotValid, setFirstnameInvalid] = useState(false);
    const [lastnameNotValid, setLastnameInvalid] = useState(false);
    const [canRegister, setCanRegister] = useState(false);
    
    const onChange = (e,name) => {
        setCredentials({
            ...credentials,
            [name]: e
        })
    }
    const confirmPasswordChanged = (e) => {
        setConfirmPassword(e)   
    }
    useEffect(() => {
        checkIfCanRegister()
    }, [confirmPassword, credentials]);

    const resetAllError = () => {
        setInvalid(false)
        setEmailNotValid(false)
        setFirstnameInvalid(false)
        setLastnameInvalid(false)
    }

    const checkIfCanRegister = () => {
        setCanRegister(confirmPassword === credentials.password &&  confirmPassword != '' &&  credentials.lastname != '' &&  credentials.firstanme != '')
    }
    const onSubmit = () => {
        resetAllError()
        var url = SYMFONY_URL+"/api/register";

        var config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            //je sais pas 
            data: JSON.stringify(credentials)
        };
   
        axios(config)
        .then(function (response) {
                AsyncStorage.setItem('login', credentials.login);
                AsyncStorage.setItem('password', credentials.password);
                AsyncStorage.setItem('firstname', credentials.firstname);
                AsyncStorage.setItem('lastname', credentials.lastname);
                navigation.navigate('Home');
            
        })
        .catch(function (error) {
            if(error.data.message === "email not valid") {
                setEmailNotValid(true);
            }
            if(error.data.message === "Firstname not valid") {
                setFirstnameInvalid(true);
            }
            if(error.data.message === "Lastname not valid") {
                setLastnameInvalid(true);
            }
            //default error
            setInvalid(true);

            
        });

      };

    return(
        <View style={styles.container}>
        {invalid && <Text style={styles.invalid}>La création de compte a échoué veuillez réessayer</Text>}
        {emailNotValid && <Text style={styles.invalid}>Le format de l'email n'est pas bon</Text>}
        {firstnameNotValid && <Text style={styles.invalid}>Merci de renseigner un prénom</Text>}
        {lastnameNotValid && <Text style={styles.invalid}>Merci de renseigner un nom</Text>}

        <TextInput placeholder="Email" name="email" value={credentials.email} onChangeText={e =>onChange(e,'email')} style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry={true} name="password" value={credentials.password} onChangeText={e =>onChange(e,"password")} style={styles.input} />
        <TextInput placeholder="Confirm Password" secureTextEntry={true} name="confirmPassword" value={confirmPassword} onChangeText={e =>confirmPasswordChanged(e)} style={styles.input} />
        <TextInput placeholder="firstname" name="firstname" value={credentials.firstname} onChangeText={e =>onChange(e,"firstname")} style={styles.input} />
        <TextInput placeholder="lastname" name="lastname" value={credentials.lastname} onChangeText={e =>onChange(e,"lastname")} style={styles.input} />
        <Button title="valider inscription" disabled={!canRegister} onPress={onSubmit} style={styles.button} />
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