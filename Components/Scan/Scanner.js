import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  Button
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IMAGE_FOLDER } from "@env"

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not scanned yet");

  const askForCameraPermission = () => {
    (async () => { 
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == "granted");
    }) ()
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>
          No access to camera
        </Text>

        <Button title={ "Allow Camera" } onPress={() => askForCameraPermission()}></Button>
      </View>
    )
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: "90%", width: "90%" }} />

      <Text style={{ fontSize: 16, margin: 20 }}>{ data }</Text>

      {scanned && <Button title={ "Scan again" } onPress={() => setScanned(false)} color="tomato" />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9C9C9',
    alignItems: "center",
    justifyContent: "center",
  },
});
