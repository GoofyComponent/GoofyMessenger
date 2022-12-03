import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }) {
    const Stack = createNativeStackNavigator();


    
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if(value === null) {
                // on first launch, value will be null so we need to navigate to login screen and we can't go back to home until login
                navigation.navigate('Login')
            }
        } catch(e) {
            // display error message
            
        }
    }

    getData()
  
    // if (token) {
    //     navigation.navigate('Login');
    // }
    return (
        <View>
            <Text>Home</Text>
            <StatusBar style="auto" />
        </View>        
    );
}
