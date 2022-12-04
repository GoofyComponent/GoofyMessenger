import AsyncStorage from '@react-native-async-storage/async-storage';


async function getJWT() {
    try {
        const value = await AsyncStorage.getItem('token');
        if(value !== null) {
            return value;
        }
    } catch(e) {
        console.log(e);
    }
}

export default getJWT;