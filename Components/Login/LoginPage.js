import { useState, useEffect } from 'react';
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import ScanPage from '../Scan/ScanPage';
import { CLIENT_ID } from "@env"

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
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
                <Image source={{ uri: user.picture.data.url }} style={styles.image}></Image>
                <Text style={styles.name}>{ user.name }</Text>
                <Text>ID: { user.id }</Text>
            </View>
            
            <ScanPage></ScanPage>
        </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      { user ? (
            <Profile user={user}/>
        ) : (
            <Button
                disabled={!request}
                title="Sign in with Facebook"
                onPress={handlePressAsync}
            />
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20
  },

  profile: {
    alignItems: "center",
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
