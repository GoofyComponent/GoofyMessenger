import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TouchableOpacity,
} from 'react-native';


import  HomeScreen  from './components/HomeScreen';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/chat/Chat';
import Logout from './components/Logout';
import QrCode from './components/QrCode';

import { Image } from 'react-native-safe-area-context';
import Modal from "react-native-modal";

// react-native-vector-icons fontawesome
import { FontAwesome } from '@expo/vector-icons';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({navigation})=>({
          headerRight: () => (
            <View>
              {/* <Button onPress={()=>handleModal()} title="Se deconnecter" color="#bee6e6" style={{marginRight: 10 , marginLeft: 10}}/> */}
              {/* logout icone from Fontawsome */}
              <TouchableOpacity onPress={()=>handleModal()} style={{marginRight: 10 , marginLeft: 10}}>
                <FontAwesome name="sign-out" size={24} color="red" />
              </TouchableOpacity>
              <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                      {/* On fait une boite blanche au milieu de l'écran, avec un message et deux bouton */}
                      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -150 }, { translateY: -100 }] , width: 300, height: 200}}>
                        <Text style={{ fontSize: 20, marginBottom: 20, textAlign:'center' }}>Voulez-vous vraiment vous déconnecter ?</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' , marginTop: 20}}>
                          <TouchableOpacity onPress={()=>{handleModal(); Logout({navigation})}} style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 , marginRight: 10}}>
                            <Text style={{ color: 'white' }}>Oui</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>handleModal()} style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, marginLeft: 10 }}>
                            <Text style={{ color: 'white' }}>Non</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                </View>
              </Modal>
            </View>
          ),
          // header max width 800
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#756da7', borderWidth: 0, maxWidth: 800},
          headerTintColor: '#bee6e6',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          title: 'Liste des conversations'

        })}/>
        {/* login component but there is no arrow to return home */}
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headerStyle: {backgroundColor: '#756da7', borderWidth: 0}, headerTintColor: '#bee6e6'}} />
        <Stack.Screen name="Chat" component={Chat} options={({route})=>({
          // header max width 800
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#756da7', borderWidth: 0, maxWidth: 800},
          headerTintColor: '#bee6e6',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
        })}/>
        {/* login via QRCODE */}
        <Stack.Screen name="QrCode" component={QrCode} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  popup: {
    position: 'absolute',
  },

});
