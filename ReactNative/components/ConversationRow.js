
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function ConversationRow({user, navigation, mercureJwt}) {
    return (
        <View style={styles.container}>
            {/* pass user in onPress and navigate */}
            {/* dans la navigatiton le $titre est egal à username */}
            <TouchableOpacity onPress={()=>navigation.navigate('Chat', {user : user, mercureJwt : mercureJwt})} style={styles.row}>
                <View style={styles.content}>
                    <Text style={styles.name}>{user.lastname} {user.firstname}</Text>
                    <Text style={styles.message}>{user.lastMessage ? user.lastMessage.message : 'Débuter une nouvelle conversation!'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6d6ea7",
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#bee6e6',
        
    },
    message: {
        fontSize: 14,
        color: '#bee6e6',
    },
});
