import { 
  Image,
  Platform,
  StatusBar,
  Dimensions,
  StyleSheet, 
  SafeAreaView,
} from 'react-native';

//import LoginPage from './Components/Login/LoginPage';
import ScanPage from './Components/Scan/ScanPage';

const screen = Dimensions.get("screen");

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo}
        source={require(`./assets/Logo.png`)}>
      </Image>

      <ScanPage></ScanPage>
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
    width: screen.height * 10 / 100,
    height: screen.height * 10 / 100,
  },
});
