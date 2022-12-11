import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
    Button,
    FlatList,
  } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import {SYMFONY_URL} from '@env'
import { StatusBar } from 'expo-status-bar';


export default function ChatContent({store}) {
    store.subscribe(() => 
        setMessageStore(store.getState())
    )

    const [messageStore, setMessageStore] = useState(store.getState());

    let me = messageStore.message.me;
    let other = messageStore.message.other;
    let Allmessages = messageStore.message.messages;
    if(Allmessages) {
        Allmessages = Object.values(Allmessages);
        // flatlist 
        return(
            <View style={styles.container}>
                <FlatList
                    inverted ={true}
                    // initialScrollIndex={Allmessages.length - 1}
                    data={Allmessages.reverse()}
                    renderItem={({item, index}) => {
                       return(
                            
                            <View style={item.author === me ? styles.myMessage : styles.otherMessage} key={index}>
                                <Text>{item.content}</Text>
                            </View>

                          )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',

    },
    myMessage:{
        maxWidth: '70%',
        minWidth: '20%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
    otherMessage:{
        maxWidth: '70%',
        minWidth: '20%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
});

