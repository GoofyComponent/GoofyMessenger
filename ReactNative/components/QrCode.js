import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QrCode({ navigation }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []);


    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(data);
        AsyncStorage.setItem('token', data);
        navigation.navigate('Home');
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>QrCode</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Login')}
            />
        </SafeAreaView>
    );
}