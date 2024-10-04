import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import Billiard from "../assets/billiard.png";
import { useFonts } from "expo-font";

export default function CardMenu({image, title}) {
  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-ExtraLightItalic': require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
  });
  return (
    <>
      <View style={styles.CardContainer}>
        <Image style={styles.image} source={image} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  CardContainer: {
    width: 320,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 16,
    height: 80,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent:'flex-start',
    padding: 6,
  
    backgroundColor: "#fff",
    shadowOffset:{width:0, height:10},shadowRadius:10,shadowOpacity:0.1,elevation:10,
    display:'flex',
    flexDirection:'row'
    
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  text:{
    fontSize:24,
    fontFamily: 'Montserrat-ExtraBold',
    fontWeight:'bold'
    ,marginLeft:15
  }
});
