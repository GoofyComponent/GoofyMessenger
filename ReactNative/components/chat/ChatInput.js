// a simple input and a button to submit the message 

import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

export default function ChatInput() {
    const [message, setMessage] = useState('');
    const onSubmit = () => {
        // sendMessage(message);
        // setMessage('');
    }
    
   


    return (
        // button into the input 
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type a message"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={onSubmit}
            />
            <Button title="Send" onPress={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        paddingTop: 20,
        width: '100%',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal: 10,
    },

});