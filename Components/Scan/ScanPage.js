import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View,
  Image,
  TextInput,
  Dimensions,
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { IMAGE_FOLDER } from '@env';

import Scanner from './Scanner';
import ProductInfoPage from '../Data/ProductInfoPage';

const screen = Dimensions.get("screen");

export default function ScanPage() {
  const [data, setData] = useState(null);
  const getData = (data) => {
    setData(data);
  }

  useEffect(() => {
    if (data != null) {
      return (
        <ProductInfoPage data={data}></ProductInfoPage>
      )
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.QRscanner}>
        <Scanner getData={getData}></Scanner>
      </View>

      <View style={{ marginTop: 20, alignSelf: "center", alignItems: "center", }}>
        <TouchableOpacity>
          <Image style={styles.scanBtn}
            source={require(`${IMAGE_FOLDER}/Scan.png`)}>
          </Image>
        </TouchableOpacity>

        <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", }}>
          SCAN BARCODE
        </Text>
      </View>

      <View style={{ marginRight: "10%", marginLeft: "10%", marginTop: 100, flexDirection: "row", }}>
        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            OR  
          </Text>
        </View>

        <View style={{ justifyContent: 'space-evenly' }}>
          <Text style={{ fontSize: 20}}>
            Enter codes manually
          </Text>
        </View>
      </View>

      <View style={styles.QRcontainer}>
        <TextInput style={{ backgroundColor: "#C9C9C9", width: "90%", position: "relative", }}
          placeholder="  Enter code here"> 
        </TextInput>

        <TouchableOpacity style={{ marginRight: 10 }}>
          <Image style={styles.enterBtn}
            source={require(`${IMAGE_FOLDER}/Enter.png`)}>
          </Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scanBtn: {
    width: screen.height * 10 / 100,
    height: screen.height * 10 / 100,
  },

  enterBtn: {
    width: screen.height * 5 / 100, 
    height: screen.height * 5 / 100,
  },

  QRscanner: {
    width: 350, 
    height: 350,
    
    alignSelf: "center",
  },

  QRcontainer: {
    width: screen.width * 80 / 100,
    height: screen.height * 5 / 100,

    marginTop: 10,
    marginLeft: screen.width * 5 / 100,

    flexDirection: "row"
  },
});
