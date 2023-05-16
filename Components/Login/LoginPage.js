import { useState, useEffect } from 'react';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { 
  Text, 
  View,
  Image,
  Button,
  StatusBar,
  Platform,
  TextInput,
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import ScanPage from '../Scan/ScanPage';
import { CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: CLIENT_ID
  });

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
        (async () => {
            const userInfoResponse = await fetch(
              `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
            );
            const userInfo = await userInfoResponse.json();
            setUser(userInfo);
        })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();

    if (result.type !== "success") {
        alert("Something went wrong");
        return 0;
    }
  }

  function Profile({ user }) {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.name}>{ user.name }</Text>
                <Text>ID: { user.id }</Text>
            </View>
            
            <ScanPage></ScanPage>
        </View>
    );
  }

  return (
    <>
      { user ? (
            <Profile user={user}/>
        ) : (
          <SafeAreaView style={styles.container}> 
            <Text style={styles.logo}>Welcome User</Text>

            <View style={styles.inputView}>
              <TextInput  
                style={styles.inputText}
                placeholder="Email..." 
                placeholderTextColor="white"
                onChangeText={text => this.setState({ email: text })}/>
            </View>

            <View style={styles.inputView}>
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..." 
                placeholderTextColor="white"
                onChangeText={text => this.setState({ password: text })}/>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>

            <Button
                disabled={!request}
                title="Sign in with Facebook"
                onPress={handlePressAsync}
            />
          </SafeAreaView>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },

  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },

  inputText: {
    height: 50,
    color: "white",
  },

  inputText: {
    height: 50,
    color: "white",
  },

  forgot: {
    color: "white",
    fontSize: 11,
  },

  loginBtn:{
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },

  loginText: {
    color: "white",
  },

  profile: {
    alignItems: "flex-end",
  },

  name: {
    fontSize: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
