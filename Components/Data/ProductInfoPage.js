import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet, 
    SafeAreaView,
} from 'react-native';

import { IMAGE_FOLDER } from '@env';
  
export default function ProductInfoPage(props) {
    const [data, setData] = useState(props.data);
    const [image, setImage] = useState(null);
    const [links, setLinks] = useState(null);

    useEffect(() => {
        try {
            setImage(data.image)
        } catch (error) {
            try {
                setLinks(data.links)
            } catch (error) {
                
            }
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignSelf: "center", alignItems: "center", }}>
                {image ? (
                    <Image style={styles.image}
                        source={{ uri: data.image}}>
                    </Image>
                ) : (
                    <Image style={styles.image}
                        source={require(`${IMAGE_FOLDER}/No_Image.png`)}>
                    </Image>
                )}
            </View>

            <View style={{ marginTop: 20, alignSelf: "center", alignItems: "center", }}>
                {links ? (
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                            Related links
                        </Text>

                        <Text style={{ fontSize: 10 }}>
                            Link 1: { data.links[0] } 
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            Link 2: { data.links[1] } 
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            Link 3: { data.links[2] } 
                        </Text>
                    </View>
                ) : (
                    <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                        No related links found!
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    image: {
        width: 300,
        height: 300,
    }
});
  