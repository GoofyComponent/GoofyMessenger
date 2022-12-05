import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



import  HomeScreen  from './components/HomeScreen';
import Login from './components/Login';
import Register from './components/Register';

import Logout from './components/Logout';

export default function App() {

  const Stack = createNativeStackNavigator();

 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({navigation})=>({
          headerRight: () => (
            <Button onPress={()=>Logout({navigation})} title="Logout" color="#000" />
          ), 
        })}/>
        {/* login component but there is no arrow to return home */}
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
