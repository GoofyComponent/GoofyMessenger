
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const onPress = (navigation, conversation) => {};

export default function ConversationRow({user, navigation}) {
    return (
        <View style={styles.container}>
            {/* trigger alter */}
            <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.row}>
                <View style={styles.content}>
                    <Text style={styles.name}>{user.lastname} {user.firstname}</Text>
                    {/* if not nut display user.lastMessage.message coupé sur 15 caractères max*/}
                    <Text style={styles.message}>{user.lastMessage ? user.lastMessage.message : 'Débuter une nouvelle conversation!'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        
    },
    message: {
        fontSize: 14,
    },
});
