import React from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Scanner from './Scanner';

const screen = Dimensions.get("screen");

export default function ScanPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo}
        source={require("../assets/Logo.png")}>
      </Image>

      <View style={styles.QRscanner}>
        <Scanner></Scanner>
      </View>

      <View
        style={{
          marginTop: 20,
          alignSelf: "center",
          alignItems: "center",
        }}>
        <TouchableOpacity>
              <Image style={styles.scanBtn}
                source={require("../assets/Scan.png")}>
              </Image>
        </TouchableOpacity>

        <Text 
          style={{ 
            marginTop: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}>
          SCAN BARCODE
        </Text>
      </View>

      <View
        style={{
          marginRight: "10%",
          marginLeft: "10%",
          marginTop: 100,
        }}>
        <Text>
          <Text 
            style={{
              marginLeft: "5%",
              fontSize: 20,
              fontWeight: "bold",
            }}>
              OR
          </Text>

          <Text
            style={{
              marginRight: "10%",
              marginLeft: "10%",
              fontSize: 15,
            }}>
            Enter codes manually
          </Text>
        </Text>
      </View>

      <View style={styles.QRcontainer}>
        <TextInput
          style={{
            backgroundColor: "#C9C9C9",
            width: "90%",
            position: "relative",
          }}

          placeholder="  Enter code here"> 

        </TextInput>

        <TouchableOpacity>
              <Image style={styles.enterBtn}
                source={require("../assets/Enter.png")}>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20
  },

  logo: {
    width: screen.height * 20 / 100,
    height: screen.height * 20 / 100,
  },

  scanBtn: {
    width: screen.height * 20 / 100,
    height: screen.height * 20 / 100,
  },

  enterBtn: {
    width: screen.height * 10 / 100, 
    height: screen.height * 10 / 100,
  },

  QRscanner: {
    marginTop: 20,
    alignSelf: "center",
    width: "70%", 
    height: "34%",
  },

  QRcontainer: {
    width: "80%",
    height: "5%",
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: 20,
    flexDirection: "row"
  },
});
