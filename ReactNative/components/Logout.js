import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Logout({navigation}) {

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
        } catch(e) {
            console.log(e);
        }
    }

    logout();
}
    