import { StyleSheet, Text, View,RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import {MERCURE_URL} from '@env'


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import  getJWT from '../utils/getJWT';

import ConversationRow from './ConversationRow';
import RNEventSource from 'react-native-event-source';

import Loading from './Loading';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    // const [jwt, setJwt] = useState('');

    const [refreshing, setRefreshing] = useState(false)

    const [mercureJwt, setMercureJwt] = useState('');

    const [isFetching, setIsFetching] = useState(false);
    
    useEffect(() => {
        let jwtPromise = getJWT();
        setIsFetching(true);
        jwtPromise.then((jwt) => {
            // if jwt undefined, redirect to login
            if(!jwt) {
                navigation.navigate('Login');
            }
            var url = SYMFONY_URL + "/api/users/all";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                }
            };
            axios.get(url, config)
            .then(function (response) {
                let messages = response.data.users;
                messages = Object.values(messages);
                setUsers(messages);
                setIsFetching(false);
            })
            .catch(function (error) {
                if(error.response.data.message === "Expired JWT Token") {
                    navigation.navigate('Login');
                }
                if(error.response.data.message === "Invalid JWT Token") {
                    navigation.navigate('Login');
                }
            });
        });
    }, [refreshing]);

    useEffect(() => {
        let jwtPromise = getJWT();
        jwtPromise.then((jwt) => {
            // if jwt undefined, redirect to login
            if(!jwt) {
                navigation.navigate('Login');
            }
            var url = SYMFONY_URL + "/api/mercureAuthorization";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                }
            };

            axios.get(url, config)
            .then(function (response) {
                let mercureJwt = response.data.mercureAuthorization;
                setMercureJwt(mercureJwt);
            })
            .catch(function (error) {
                if(error.response.data.message === "Expired JWT Token") {
                    navigation.navigate('Login');
                }
                if(error.response.data.message === "Invalid JWT Token") {
                    navigation.navigate('Login');
                }
            });
        });
    }, []);

    // tant que mercureJwt est vide, on ne peut pas se connecter à mercure
    


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // getData();
        wait(2000).then(() => setRefreshing(false));
    }, []);


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
    // on message event
    eventSource.addEventListener('message', (event) => {
        onRefresh();
    });

    if(isFetching) {
        <Loading message="Chargements de vos conversations..."/>
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {users.map((user) => (
                    <ConversationRow key={user.id} user={user} navigation={navigation} mercureJwt={mercureJwt} eventSource={eventSource}/>
                ))}
            </ScrollView>
            
        </SafeAreaView>        
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#756da7",
      maxWidth: 800,
    },
    scrollView: {
      alignItems: 'center',
    //   justifyContent: 'top',
      backgroundColor:"#756da7",
    },
  });