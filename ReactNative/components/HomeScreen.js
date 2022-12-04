import { StyleSheet, Text, View,RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {SYMFONY_URL} from '@env'


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect,useCallback } from 'react';


import  getJWT from '../utils/getJWT';

import ConversationRow from './ConversationRow';




const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// const getData = async () => {
//     try {
//         const value = await AsyncStorage.getItem('token');
//         if(value === null) {
//             // on first launch, value will be null so we need to navigate to login screen and we can't go back to home until login
//             navigation.navigate('Login');
//         }

//         var url = SYMFONY_URL + "/api/users/1";
//         var config = {
//             headers: {
//                 'Authorization': 'Bearer ' + value,
//             }
//         };

//         axios.get(url, config)
//         .then(function (response) {
//             let messages = response.data.users;
//             // messages to array
//             messages = Object.values(messages);
//             setUsers(messages);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
        

//     } catch(e) {
        
//     }
// }
export default function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    // const [jwt, setJwt] = useState('');

    useEffect(() => {
        let jwtPromise = getJWT();
        jwtPromise.then((jwt) => {
            var url = SYMFONY_URL + "/api/users/1";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                }
            };

            axios.get(url, config)
            .then(function (response) {
                let messages = response.data.users;
                // messages to array
                messages = Object.values(messages);
                setUsers(messages);
            })
            .catch(function (error) {
                console.log(error);
            });
        });
    }, []);



    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // on attend la réponde de getData
        // getData();
        wait(2000).then(() => setRefreshing(false));
        // wait(2000).then(() => setRefreshing(false));
      }, []);

    const Stack = createNativeStackNavigator();
    // getData();

    

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
                    // console.log(user)
                    <ConversationRow key={user.id} user={user}/>
                ))}
            </ScrollView>
            
        </SafeAreaView>        
    );
}

// return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollView}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//           />
//         }
//       >
//         <Text>Pull down to see RefreshControl indicator</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    //   backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'top',
    },
  });